import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ICommand } from '../stores/command/model/ICommand';
import { addAction, clearAction, removeAction } from '../stores/command/command.actions';
import { ModalController, ToastController } from '@ionic/angular';
import { v4 as uuidv4 } from 'uuid';
import { CommandModalComponent } from '../components/command-modal/command-modal.component';
@Injectable({
  providedIn: 'root'
})
export class CommandsService {

  constructor(
    private _store: Store<{commands: ICommand}>,
    private modalController: ModalController,
    private _toastCtrl: ToastController,
  ) { }

  public deleteCommand(id: string | number): void {
    this._store.dispatch(removeAction({id}));
  }

  public async addCommand() {
    const modal = await this.modalController.create({
      component: CommandModalComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      const uuid = uuidv4();
      const command = {[uuid]: {...data}};
      this._store.dispatch(addAction({ command }));
      const toast = await this._toastCtrl.create({message: "Command has been added", duration: 3000, color: 'success'});
      toast.present();
    }

    return await modal.onDidDismiss();
  }

  public clearCommands(): void {
    this._store.dispatch(clearAction());
  }
}
