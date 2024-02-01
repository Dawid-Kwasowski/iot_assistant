import { AlertController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { IDevice } from '../stores/device/model/IDevice';
import { removeAction } from '../stores/device/device.actions';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(
    private _store: Store<{device: IDevice}>,
    private alertController: AlertController,
  ) { }


  public deleteCommand(id: string | number): void {
    this._store.dispatch(removeAction({id}));
  }


  public async addDevice() {
    
  }

}
