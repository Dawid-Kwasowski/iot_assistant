import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AssistantComponent } from './assistant/assistant.component';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule
  ],

  declarations: [AssistantComponent],
  exports: [AssistantComponent]
})
export class ComponentsModule { }
