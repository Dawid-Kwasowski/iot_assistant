import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import mqtt from "mqtt";
@Injectable({
  providedIn: 'root'
})
export class MqttService {

  constructor() { }


  private client!: mqtt.MqttClient;
  private powerTopic: string = "cmnd/tasmota_A06894/POWER";
  public tempOptions = {
    host: "wss://springcloak517.cloud.shiftr.io:443", // Adjust if the broker uses a different port for wss
    password: "aE0XYSw4inRnZSPh",
    username: "springcloak517",
    clientId: "mqtt_js-Dawid333"
  }
 
  public powerOffDevice() {
    this.client.subscribe(this.powerTopic, (err: any) => {
      if (!err) {
        this.client.publish(this.powerTopic, "OFF");
      }
    });
  }

  public powerOnDevice() {
    this.client.subscribe(this.powerTopic, (err: any) => {
      if (!err) {
        this.client.publish(this.powerTopic, "ON");
      }
    });
  }

  public async connect() {
    const { host, password, username, clientId } = this.tempOptions;
    try {
       this.client = await mqtt.connectAsync(host, {
        clientId,
        password,
        username,
        protocol: "wss" // Use 'wss' for secure WebSocket connection
      });
      
      this.client.on("message", (topic: any, message: { toString: () => any; }) => {
        // message is Buffer
        console.log(message.toString());
        // client.end();
      });
      // Perform additional actions such as subscribing to topics here
    } catch (error) {
      console.error('Connection failed:', error);
    }
  }


  public disconnect() {
    if(this.client.connected) {
      this.client.end();
    }
  }
  
}
