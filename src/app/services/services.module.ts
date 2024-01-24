import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormValidatorService } from './form-validator.service';
import { MqttModule } from 'ngx-mqtt';
import { AppMqttCommunicationService } from './app-mqtt-communication.service';
@NgModule({
  imports: [
    CommonModule,
    MqttModule.forRoot({
      hostname: 'eb75a0bbf42e47f99993ec2bc7bc5a72.s1.eu.hivemq.cloud',
      port: 8884,
      protocol: 'wss',
      username: 'Dawid',
      password: 'Termin23#',
      path:'/mqtt'
    })
  ],
  providers: [
    FormValidatorService,
    AppMqttCommunicationService,
  ],
})
export class ServicesModule { }
