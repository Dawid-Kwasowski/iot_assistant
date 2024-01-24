import { Injectable } from '@angular/core';
import { MqttService } from 'ngx-mqtt';
import { Observable, Observer, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppMqttCommunicationService {
  private _subscription!: Subscription;
  public message!: string;

  constructor(private _mqttService: MqttService) {
    this._subscription = this._mqttService.observe('my/test/topic').subscribe({
      next: (message): void => {
        this.message = message.payload.toString();
        console.log("Nuda mnie napędza",this.message);
      },
      error: (err) => {
        console.log("ERROR: " + err);
      },
      complete: () => {
        console.log("Completed");
      }
     });  
  }

  public observeTopic(topic: string): Observable<string> {
    return new Observable<string>((observer: Observer<string>) => {
      this._mqttService.observe(topic).subscribe({
        next: (message): void => {
          this.message = message.payload.toString();
          observer.next(this.message);
        },
        error: (err) => {
          observer.error(err);
        },
        complete: () => {
          observer.complete();
        }
       });
    });
  }

  public unsafePublish(topic: string, message: string): void {
    this._mqttService.unsafePublish(topic, message, {qos: 1, retain: true});
  }

  public ngOnDestroy() {
    this._subscription.unsubscribe();
  }

}
