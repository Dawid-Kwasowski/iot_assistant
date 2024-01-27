import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { SupabaseService } from 'src/app/services/supabase/supabase.service';
import { IUser } from 'src/app/stores/user/model/IUser';
import { clearAction, updateAction } from 'src/app/stores/user/user.actions';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private _store: Store<{user: IUser}>,
    private _supabase: SupabaseService) { }
    
  public async signOut(): Promise<void> {
    this._store.dispatch(clearAction());
    await this._supabase.signOut();
  }

  public async retrieveUser(): Promise<void> {
    try {
      const { data, error } = await this._supabase.retrieveUser();
      if (error) {
        throw error;
      }
      const { user: {email, user_metadata: { user_name } }} = data;
      this._store.dispatch(updateAction({email: email || "", username: user_name}));
    } catch (error: any) {
      await this._supabase.createNotice(error.error_description || error.message, "danger");
      console.error(error);
    }
  }
}
