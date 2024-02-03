import { Component, Input, OnDestroy, OnInit, computed, signal } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { MqttService } from 'ngx-mqtt';
import { statusAction } from 'src/app/stores/device/device.actions';
import { IDevice, IDeviceDescription } from 'src/app/stores/device/model/IDevice';

@Component({
  selector: 'app-smartsocket-template',
  templateUrl: './smartsocket-template.component.html',
  styleUrls: ['./smartsocket-template.component.scss'],
})
export class SmartsocketTemplateComponent implements OnInit, OnDestroy {
  
  @Input() data!: [string, IDeviceDescription];

  public deviceStatus = signal('');

  public statusColor = computed((): 'success' | 'danger' => this.deviceStatus() === "ON" ? "success" : "danger");
  
  constructor(
    private _modalCtrl: ModalController,
    private _mqttService: MqttService,
    private _store: Store<{device: IDevice}>
  ) { }
  
  ngOnDestroy(): void {
  }
  
  ngOnInit() {
    this._mqttService.unsafePublish(`cmnd/${this.data[1].name}/POWER`, " ");
    this._mqttService.observe(`stat/${this.data[1].name}/RESULT`).subscribe({
      next: (value): void => {
        const result = JSON.parse(value.payload.toString());
        if(result.POWER) {
          this.deviceStatus.set(result.POWER);
          this._store.dispatch(statusAction({ id: this.data[0], status: result.POWER}))
        }
      }
    });
  }

  public togglePower(): void {
    let newStatus;
    
    if(this.deviceStatus() === "OFF") {
      newStatus = "ON";
    }
    else {
      newStatus = "OFF";
    }

    this._mqttService.unsafePublish(`cmnd/${this.data[1].name}/POWER`, newStatus);
  }

  public cancel() {
    return this._modalCtrl.dismiss(null, 'cancel');
  }

  public removeDevice() {
    this._modalCtrl.dismiss(this.data[0], 'deleteDevice');
  }
  
}
