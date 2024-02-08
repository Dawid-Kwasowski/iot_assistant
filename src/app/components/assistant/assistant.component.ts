import { ChangeDetectorRef, Component, OnDestroy, OnInit, computed, signal } from '@angular/core';
import { SpeechRecognition } from '@capacitor-community/speech-recognition';
import { Store } from '@ngrx/store';
import { MqttService } from 'ngx-mqtt';
import { ICommand, ICommandDescription } from 'src/app/stores/command/model/ICommand';
import { IDevice, IDeviceDescription } from 'src/app/stores/device/model/IDevice';
import { TextToSpeech } from '@capacitor-community/text-to-speech';
import { take } from 'rxjs';
@Component({
  selector: 'app-assistant',
  templateUrl: './assistant.component.html',
  styleUrls: ['./assistant.component.scss'],
})
export class AssistantComponent implements OnInit, OnDestroy {
  constructor(
    private _mqttService: MqttService,
    private changeDetectorRef: ChangeDetectorRef,
    private _store: Store<{ commands: ICommand; device: IDevice }>,
  ) {
    SpeechRecognition.requestPermissions();
  }

  public readonly commands = this._store.selectSignal(({ commands }): ICommand => commands);

  public readonly devicesList = this._store.selectSignal(({ device }): IDevice => device);

  public commandsArray = computed((): [string, ICommandDescription][] => Object.entries(this.commands()));

  public deviceArray = computed((): [string, IDeviceDescription][] => Object.entries(this.devicesList()));


  private useCommand(text: string) {

    const words = text.split(' ');
    const command = words.slice(0, 2).join(' ');
    const deviceName = words.slice(-1)[0];
    

    const commandIndex = this.commandsArray().findIndex((cmd): boolean => {
      return cmd[1].name.toLowerCase() === command.toLowerCase();
    });

    const deviceIndex = this.deviceArray().findIndex((device): boolean => {
      return device[1].name.toLowerCase() === deviceName.toLowerCase();
    })

    if (commandIndex !== -1 && deviceIndex !== -1) {
      const preparedCommand = this.commandsArray()[commandIndex][1].command;
      const device = this.deviceArray()[deviceIndex][1];
      console.log(`Command: ${device.topic}`);

      this._mqttService.unsafePublish('cmnd/' + device.topic + '/POWER', preparedCommand);

      this._mqttService.observe(`stat/${device.topic}/RESULT`).pipe(take(1)).subscribe({
        next: (value): void => {
          const result = JSON.parse(value.payload.toString());
          if(result.POWER) {
              this.stopRecognition();
              TextToSpeech.speak({
                text: `The ${device.name} is ${result.POWER}`
              });
          }
        }
      });
    } else {
      console.log('Command or device not recognized:', text);
    }
  }


  public async ngOnInit(): Promise<void> {
    await TextToSpeech.speak({
      text: 'Hello?'
    });
    await this.startRecognition();
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
    const { available } = await SpeechRecognition.available();
    if (available) {
      this.recording = true;

      SpeechRecognition.start({
        partialResults: true,
        language: 'en-US',
        maxResults: 1,
      });

      SpeechRecognition.addListener('partialResults', (data: any) => {

        if (data.matches.length && data.matches.length > 0) {
          this.myText.set(data.matches[0]);
          this.useCommand(data.matches[0]);
          this.changeDetectorRef.detectChanges();
        }
      });
    }
  }

  public async stopRecognition(): Promise<void> {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.recording = false;
    await SpeechRecognition.stop();
    await SpeechRecognition.removeAllListeners();
  }


}
