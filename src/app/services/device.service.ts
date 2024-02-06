import { ModalController, ToastController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { IDevice, IDeviceDescription } from '../stores/device/model/IDevice';
import { addAction, removeAction } from '../stores/device/device.actions';
import { DeviceModalComponent } from '../components/device-modal/device-modal.component';
import { v4 as uuidv4 } from 'uuid';
import { SupabaseService } from './supabase/supabase.service';
@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(
    private _store: Store<{device: IDevice}>,
    private modalController: ModalController,
    private _toastCtrl: ToastController,
    private _supabaseService: SupabaseService,
  ) { }


  public deleteCommand(id: string | number): void {
    this._store.dispatch(removeAction({id}));
  }

  public getDevices() {
    return this._supabaseService.getAllDevices();
  }

  public insertDevice(payload: IDeviceDescription) {
    return this._supabaseService.insertDevice(payload);
  }


  public async addDevice() {
    const modal = await this.modalController.create({
      component: DeviceModalComponent,
    });

    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      const uuid = uuidv4();
      const device = {[uuid]: {...data}};
      this._store.dispatch(addAction({ device }));
      const toast = await this._toastCtrl.create({message: "Device has been added", duration: 3000, color: 'success'});
      toast.present();
    }

    return await modal.onDidDismiss();
  }

}
