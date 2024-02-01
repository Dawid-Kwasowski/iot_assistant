import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private _router: Router
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
    return this.commandList ? Object.entries(this.commandList) : [];
  }

  public async getCommands() {
    this._store.select('commands').pipe(take(1)).subscribe({
      next: (data: any) => {
        this.commandList = data;
      }
    });
  }
  
  public async addCommand() {
    const { role } = await this.commandService.addCommand();
    if(role === 'confirm') {
      this.updateState();
    }
  }
  
  public deleteCommand(id: string | number) {
    this.commandService.deleteCommand(id);
    this.updateState();
  }

  public clearCommands() {
    this.commandService.clearCommands();
    this.updateState();
  }
  
  public navigateTo(path: string[]) {
    this._router.navigate(path);
  }
}
