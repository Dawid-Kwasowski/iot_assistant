import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormValidatorService } from './form-validator.service';
import { CommandsService } from './commands.service';
import { CustomMqttService } from './mqtt/custom-mqtt.service';
@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    FormValidatorService,
    CommandsService,
    CustomMqttService
  ],
})
export class ServicesModule { }
