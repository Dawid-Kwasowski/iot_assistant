import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormValidatorService } from './form-validator.service';
import { AnimationsService } from './animations.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    FormValidatorService,
    AnimationsService
  ],
})
export class ServicesModule { }
