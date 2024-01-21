import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignOnComponent } from './sign-on.component';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ServicesModule } from 'src/app/services/services.module';
@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule,
    ReactiveFormsModule,
    ServicesModule
  ],
  declarations: [SignOnComponent]
})
export class SignOnModule { }
