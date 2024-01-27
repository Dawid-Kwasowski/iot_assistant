import { Injectable } from '@angular/core';
import { AuthChangeEvent, AuthError, AuthTokenResponsePassword, AuthSession, Session, SupabaseClient, User, createClient, SignUpWithPasswordCredentials } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';
import { IProfile } from './model/IProfile';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {

  private supabase: SupabaseClient;
  public _session: AuthSession | null = null;
  constructor(private _loadingCtrl: LoadingController, private _toastCtrl: ToastController) { 
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey)
  }

  public get session(): Session | null {
    this.supabase.auth.getSession().then(({ data }) => {
      this._session = data.session
    });
    return this._session;
  }

  public profile(user: User) {
    return this.supabase
    .from('profiles')
    .select(`username, website, avatar_url`)
    .eq('id', user.id)
    .single()
  }

  public authChanges(callback: (event: AuthChangeEvent, session: Session | null) => void) {
    return this.supabase.auth.onAuthStateChange(callback)
  }
  
  public signIn(email: string, password: string): Promise<AuthTokenResponsePassword> {
    return this.supabase.auth.signInWithPassword({ email, password });
  }

  public signOut(): Promise<{error: AuthError | null;}> {
    return this.supabase.auth.signOut()
  }

  public updateProfile(profile: IProfile) {
    const update = {
      ...profile,
      updated_at: new Date(),
    }

    return this.supabase.from('profiles').upsert(update)
  }


  public downLoadImage(path: string) {
    return this.supabase.storage.from('avatars').download(path)
  }

  public uploadAvatar(filePath: string, file: File) {
    return this.supabase.storage.from('avatars').upload(filePath, file)
  }

  async createNotice(message: string, color: string) {
    const toast = await this._toastCtrl.create({ message, duration: 5000, color, })
    await toast.present()
  }

  public createLoader() {
    return this._loadingCtrl.create({
      spinner: "circular"
    })
  }

  public async signUp(credentials: SignUpWithPasswordCredentials) {
    return this.supabase.auth.signUp(credentials);
  }

}
