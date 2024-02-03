import { Injectable } from '@angular/core';
// import mqtt from "ngx-mqtt";
import { Observable, Subscriber } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CustomMqttService {

  constructor() { 
    
  }

  // private client!: mqtt.MqttClient;

  // private powerTopic: string = "cmnd/tasmota_A06894/POWER";

  // stat/tasmota_A06894/POWER

  // public subscribeMethod(topic: string, value: string = ""): Observable<string> {
  //   return new Observable<string>((observer: Subscriber<string>) => {
      
  //     this.client.subscribe(topic, (err: any) => {
  //       if (!err) {
  //         this.client.publish(topic, value);

  //         this.client.on("message", (commingTopic: any, message: any) => {
  //           // message is Buffer
  //           if(topic === commingTopic ) {
  //             observer.next(message.toString());
  //           }
  //           // client.end();
  //         });
  //       } else {
  //         observer.error(err);
  //         observer.complete();
  //       }
  //     });

  //   });
  // }

  // public powerOffDevice() {
  //   this.client.subscribe(this.powerTopic, (err: any) => {
  //     if (!err) {
  //       this.client.publish(this.powerTopic, "OFF");
  //     }
  //   });
  // }

  // public powerOnDevice() {
  //   this.client.subscribe(this.powerTopic, (err: any) => {
  //     if (!err) {
  //       this.client.publish(this.powerTopic, "ON");
  //     }
  //   });
  // }

  // public async connect() {
  //   const { host, password, username, clientId } = this.tempOptions;
  //   try {
  //     this.client = await mqtt.connectAsync(host, {
  //       clientId,
  //       password,
  //       username,
  //       protocol: "wss" // Use 'wss' for secure WebSocket connection
  //     });

  //     // this.client.on("message", (topic: any, message: { toString: () => any; }) => {

  //     // message is Buffer
  //     //   console.log(message.toString());
  //     // client.end();
  //     // });
  //     // Perform additional actions such as subscribing to topics here
  //   } catch (error) {
  //     console.error('Connection failed:', error);
  //   }
  // }


  // public disconnect() {
  //   if (this.client.connected) {
  //     this.client.end();
  //   }
  // }

}
