import { Component, OnInit } from '@angular/core';
import { ISettingsList } from './model/ISettingsList.interface';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { SupabaseService } from 'src/app/services/supabase/supabase.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  public userSettings!: ISettingsList[];
  public actionSheetButtons!: any;

  constructor(
    private supabase: SupabaseService,
    private _translateService: TranslateService,
    private _router: Router,
    ) { }

  ngOnInit(): void {
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

  public async signOut() {
    await this.supabase.signOut()
    this._router.navigate(['/introduction'], { replaceUrl: true })
  }


  public navigateTo(name: string[]) {
    this._router.navigate(name);
  }

}
