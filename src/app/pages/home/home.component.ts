import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { SpeechRecognition } from '@capacitor-community/speech-recognition';
import { TextToSpeech } from '@capacitor-community/text-to-speech';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  @Input() myText = 'Angela Pierdziella';
  public recording: boolean = false;

  constructor(private changeDetectorRef: ChangeDetectorRef) { 
    SpeechRecognition.requestPermissions();
  }

  ngOnInit() {
  }

  public async startRecognition() {
    const {available} = await SpeechRecognition.available();

    if (available) {
      this.recording = true;
      SpeechRecognition.start({
        popup: true,
        partialResults: true,
        language: 'en-US',
      })

      SpeechRecognition.addListener('partialResults', (data: any) => {
        console.log('partialResults was fired', data.matches);
        if(data.matches.length &&data.matches.length > 0) {
          this.myText = data.matches[0];
          this.changeDetectorRef.detectChanges();
        }
      });
    }
  }

  public async stopRecognition() {
    this.recording = false;
    await SpeechRecognition.stop();
  }

  public speakText() {
    TextToSpeech.speak({
      text: this.myText,
    })
  }
}
