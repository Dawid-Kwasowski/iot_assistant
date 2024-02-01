import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IDeviceDescription } from 'src/app/stores/device/model/IDevice';

@Component({
  selector: 'app-smartsocket-template',
  templateUrl: './smartsocket-template.component.html',
  styleUrls: ['./smartsocket-template.component.scss'],
})
export class SmartsocketTemplateComponent  implements OnInit {
  
  @Input() data!: IDeviceDescription;

  constructor(private modalCtrl: ModalController,) { }

  ngOnInit() {}


  public cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }
}
