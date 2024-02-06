import { ChangeDetectorRef, Component, OnDestroy, OnInit, computed, signal } from '@angular/core';
import { SpeechRecognition } from '@capacitor-community/speech-recognition';
import { ToastController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { ICommand, ICommandDescription } from 'src/app/stores/command/model/ICommand';

@Component({
  selector: 'app-assistant',
  templateUrl: './assistant.component.html',
  styleUrls: ['./assistant.component.scss'],
})
export class AssistantComponent implements OnInit, OnDestroy {
  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private toastCtrl: ToastController,
    private _store: Store<{ commands: ICommand }>,
  ) {
    SpeechRecognition.requestPermissions();
  }

  public readonly commands = this._store.selectSignal(({ commands }): ICommand => commands);

  public commandsArray = computed((): [string, ICommandDescription][] => Object.entries(this.commands()));
  public counter = 0;

  public async ngOnInit(): Promise<void> {
    this.startRecognition();
  }

  public async ngOnDestroy(): Promise<void> {
    this.stopRecognition();
  }

  public recording: boolean = false;
  public myText = signal('');

  private timeout!: any;

  public onListening(): void {
    if (this.recording && this.commandsArray().length > 0) {
      this.stopRecognition();
    } else {
      this.startRecognition();
    }
  }

  public async startRecognition(): Promise<void> {

    try {
      const { available } = await SpeechRecognition.available();
      if (available) {
        this.recording = true;

        SpeechRecognition.start({
          popup: true,
          partialResults: true,
          language: 'en-US',
          maxResults: 1,
        });

        SpeechRecognition.addListener('partialResults', (data: any) => {

          this.counter++;

          if (data.matches.length && data.matches.length > 0) {
            this.myText.set(data.matches[0]);
            if (this.timeout) {
              clearTimeout(this.timeout);
            }

            if (this.myText() === "Turn on and make it own") {
              this.myText.set('DUPA BLADA');
            }

            else if (this.myText() === "Turn off") {
              this.myText.set('DUPA BLADA OFF');
            }

            this.timeout = setTimeout(() => {
              // SpeechRecognition.stop();
              this.myText.set(''); 
              this.changeDetectorRef.detectChanges(); 
              // SpeechRecognition.start(this.options);
            }, 2500);
        
            this.changeDetectorRef.detectChanges();
          }
        });
      }


    } catch {
      const toast = this.toastCtrl.create({ message: "Speech recognition is unsupported", duration: 5000, color: 'danger' });
      (await toast).present()
    }
  }

  public async stopRecognition(): Promise<void> {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.recording = false;
    await SpeechRecognition.stop();
  }


}
