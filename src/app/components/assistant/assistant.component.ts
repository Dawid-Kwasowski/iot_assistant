import { ChangeDetectorRef, Component, OnDestroy, OnInit, signal } from '@angular/core';
import { SpeechRecognition } from '@capacitor-community/speech-recognition';
import { ToastController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { MqttService } from 'src/app/services/mqtt/mqtt.service';
import { ICommand } from 'src/app/stores/command/model/ICommand';

@Component({
  selector: 'app-assistant',
  templateUrl: './assistant.component.html',
  styleUrls: ['./assistant.component.scss'],
})
export class AssistantComponent implements OnInit, OnDestroy {
  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private toastCtrl: ToastController,
    private _store: Store<{commands: ICommand}>,
    private mqttService: MqttService,
    ) {
      SpeechRecognition.requestPermissions();
    }
  
  public async ngOnInit(): Promise<void> {
    this.startRecognition();
    this.getCommands();
    this.getCommandList;
  }

  public async ngOnDestroy(): Promise<void> {
    this.stopRecognition();
  }

  public recording: boolean = false;
  public myText = signal('');

  private timeout!: any;

  private commandList!: ICommand;
  

  public get getCommandList() {
    return this.commandList ? Object.entries(this.commandList) : [];
  }

  public onListening(): void {
    if(this.recording && this.getCommandList.length > 0) {
      this.stopRecognition();
    } else {
      this.startRecognition();
    }
  }

  public async startRecognition(): Promise<void> {
    
    try {
      const {available} = await SpeechRecognition.available();
      if (available) {
        this.recording = true;
        SpeechRecognition.start({
          popup: true,
          partialResults: true,
          language: 'en-US',
        });
        
        SpeechRecognition.addListener('partialResults', (data: any) => {
          if(data.matches.length && data.matches.length > 0) {
            this.myText.set(data.matches[0]);
            
            if(this.timeout) {
              clearTimeout(this.timeout);
            }
            
            this.timeout = setTimeout(() => {
                if(this.myText() === "Turn on") {
                    this.mqttService.powerOnDevice();
                  }
                if(this.myText() === "Turn off") {
                  this.mqttService.powerOffDevice();
                }
                this.myText.set('');
            }, 1500)
            this.changeDetectorRef.detectChanges();
          }
        });
      }

      
    } catch {
      const toast = this.toastCtrl.create({message: "Speech recognition is unsupported", duration: 5000, color: 'danger'});
      (await toast).present()
    }    
  }

  public async stopRecognition(): Promise<void> {
    if(this.timeout) {
      clearTimeout(this.timeout);
    }
    this.recording = false;
    await SpeechRecognition.stop();
  }

  public async getCommands() {
    this._store.select('commands').pipe(take(1)).subscribe({
      next: (data: any) => {
        this.commandList = data;
      }
    })
  }
}
