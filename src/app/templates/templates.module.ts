import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmartsocketTemplateComponent } from './smartsocket-template/smartsocket-template.component';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule
  ],
  exports:[SmartsocketTemplateComponent],
  declarations: [
    SmartsocketTemplateComponent,
  ]
})
export class TemplatesModule { }
