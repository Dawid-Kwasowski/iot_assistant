import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { CommandsService } from 'src/app/services/commands.service';
import { ICommand } from 'src/app/stores/command/model/ICommand';

@Component({
  selector: 'app-commands',
  templateUrl: './commands.page.html',
  styleUrls: ['./commands.page.scss'],
})
export class CommandsPage implements OnInit {

  constructor(
    private _store: Store<{commands: ICommand}>,
    private commandService: CommandsService,
  ) { }

  ngOnInit() {
    this.updateState()
  }

  public updateState() {
    this.getCommands();
    this.getCommandList;
  }
 
  private commandList!: ICommand;

  public get getCommandList() {
    return Object.entries(this.commandList);
  }

  public async getCommands() {
    this._store.select('commands').pipe(take(1)).subscribe({
      next: (data: any) => {
        this.commandList = data;
      }
    });
  }
  
  public async addCommand() {
    await this.commandService.addCommand();
    this.updateState();
  }

  // public editCommand(command: ICommand) {
  //   throw new Error('Method not implemented.');
  // }
  
  public deleteCommand(id: string | number) {
    this.commandService.deleteCommand(id);
    this.updateState();
  }

}
