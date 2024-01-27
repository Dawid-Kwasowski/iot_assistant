import { Component, OnDestroy, OnInit } from '@angular/core';
import { ISettingsList } from './model/ISettingsList.interface';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { IUser } from 'src/app/stores/user/model/IUser';
import { take } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  public userSettings!: ISettingsList[];
  public actionSheetButtons!: any;
  public userData: IUser = {
    email: "",
    username: ""
  };
  constructor(
    private _store: Store<{user: IUser}>,
    private _translateService: TranslateService,
    private _router: Router,
    private _userService: UserService
    ) { }

  ngOnInit(): void {
    (async () => await this.retrieveUser())();
    this.userSettings = [
      {
        title: 'General Settings', 
        group: [
          {
            title: 'Personal Information',
            link: ''
          },
        ]
      }
    ];

    this.actionSheetButtons = [
      {
        handler: async () =>  {
          await this.signOut()       
        },
        text: this._translateService.instant('user.settings.logout.actions.buttons.confirm'),
        role: 'destructive',
        data: {
          action: 'delete',
        },
      },
      {
        text: this._translateService.instant('user.settings.logout.actions.buttons.cancel'),
        role: 'cancel',
        data: {
          action: 'cancel',
        },
      },
    ]
  }

  public async signOut(): Promise<void> {
    await this._userService.signOut();
    await this._router.navigate(['/introduction'], { replaceUrl: true });
  }


  public async navigateTo(name: string[]): Promise<void> {
    await this._router.navigate(name);
  }


  public async retrieveUser(): Promise<void> {
    await this._userService.retrieveUser();
    this._store.select('user').pipe(take(1)).subscribe({
      next: (data): void => {
        this.userData = data;
      },
    });
  }

  public async handleRefresh(event: any) {
    await this.retrieveUser();
    event.target.complete();
  }

}
