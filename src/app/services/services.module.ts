import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormValidatorService } from './form-validator.service';
import { CommandsService } from './commands.service';
@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    FormValidatorService,
    CommandsService
  ],
})
export class ServicesModule { }
