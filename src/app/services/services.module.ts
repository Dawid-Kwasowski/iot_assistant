import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormValidatorService } from './form-validator.service';
@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    FormValidatorService,
  ],
})
export class ServicesModule { }
