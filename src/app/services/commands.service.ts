import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ICommand } from '../stores/command/model/ICommand';
import { addAction, clearAction, removeAction } from '../stores/command/command.actions';
import { AlertController } from '@ionic/angular';
import { v4 as uuidv4 } from 'uuid';
@Injectable({
  providedIn: 'root'
})
export class CommandsService {

  constructor(
    private _store: Store<{commands: ICommand}>,
    private alertController: AlertController
  ) { }

  public deleteCommand(id: string | number): void {
    this._store.dispatch(removeAction({id}));
  }

  public async addCommand() {
    const alert = await this.alertController.create({
      header: 'Add a new command',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Confirm',
          role: 'confirm',
          handler: (value): void => {
            if(value.name.length === 0 || value.command.length === 0) return;
            const uuid = uuidv4();
            const command = {[uuid]: {...value}};
            this._store.dispatch(addAction({command}));
          },
        }
    ],
      inputs: [
        {
          type: 'text',
          name: 'name',
          placeholder: 'Command name',
        },
        {
          type: 'text',
          name: 'command',
          placeholder: 'Type command'
        },
      ],
      
    })
    await alert.present();
    return await alert.onDidDismiss();
  }

  public clearCommands(): void {
    this._store.dispatch(clearAction());
  }
}
