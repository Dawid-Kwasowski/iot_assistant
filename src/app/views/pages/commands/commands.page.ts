import { Component, OnInit, computed } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CommandsService } from 'src/app/services/commands.service';
import { ICommand, ICommandDescription } from 'src/app/stores/command/model/ICommand';

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


  public readonly commands = this._store.selectSignal(({ commands }): ICommand => commands);

  public commandsArray = computed((): [string, ICommandDescription][] => Object.entries(this.commands()));

  ngOnInit(): void {}
  
  public async addCommand() {
    await this.commandService.addCommand();
  }
  
  public deleteCommand(id: string | number) {
    this.commandService.deleteCommand(id);
  }

  public clearCommands() {
    this.commandService.clearCommands();
  }
  
  public navigateTo(path: string[]) {
    this._router.navigate(path);
  }
}
