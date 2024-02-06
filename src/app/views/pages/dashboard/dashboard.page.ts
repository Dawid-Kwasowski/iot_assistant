import { Component, OnDestroy, OnInit, computed } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { CommandsService } from 'src/app/services/commands.service';
import { DeviceService } from 'src/app/services/device.service';
import { loadDevices, removeAction } from 'src/app/stores/device/device.actions';
import { IDevice, IDeviceDescription } from 'src/app/stores/device/model/IDevice';
import { SmartsocketTemplateComponent } from 'src/app/templates/smartsocket-template/smartsocket-template.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit, OnDestroy {
  constructor(
    private _commandService: CommandsService,
    private _deviceService: DeviceService,
    private _store: Store<{device: IDevice}>,
    private modalController: ModalController,
  ) { }

  public readonly devicesList = this._store.selectSignal(({ device }): IDevice => device);

  public deviceArray = computed((): [string, IDeviceDescription][] => Object.entries(this.devicesList()));

  async ngOnInit() {
    this._store.dispatch(loadDevices())
  }

  ngOnDestroy() {
  }

  public async addCommand() {
    await this._commandService.addCommand();
  }

  public async addDevice() {
    await this._deviceService.addDevice();
  }

  public handleRefresh(event: any) {
    setTimeout(() => {
      this._store.dispatch(loadDevices())
      event.target.complete();
    }, 2000);
  }

  public async openTemplate(payload: [string, IDeviceDescription]): Promise<void> {

    let module;

    switch (payload[1].type) {
      case "smartsocket":
        module = SmartsocketTemplateComponent
        break;
    
      default:
        break;
    }

    if(!module) return;

    const modal = await this.modalController.create({
      component: module,
      componentProps: {
        data: payload,
      }
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();
    
    if(role === "deleteDevice") {
      this._store.dispatch(removeAction({id: data}));
    }

  }
}
