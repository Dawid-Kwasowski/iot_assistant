import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AssistantComponent } from './assistant/assistant.component';
import { TranslateModule } from '@ngx-translate/core';
import { DeviceModalComponent } from './device-modal/device-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommandModalComponent } from './command-modal/command-modal.component';
@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule,
    ReactiveFormsModule
  ],

  declarations: [AssistantComponent, DeviceModalComponent, CommandModalComponent],
  exports: [AssistantComponent, DeviceModalComponent, CommandModalComponent]
})
export class ComponentsModule { }
