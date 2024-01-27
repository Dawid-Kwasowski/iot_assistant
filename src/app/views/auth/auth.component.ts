import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormValidator } from 'src/app/bases/form-validator';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { SupabaseService } from 'src/app/services/supabase/supabase.service';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent extends FormValidator implements OnInit {

  constructor(
    protected override _formValidatorService: FormValidatorService,
    private readonly _superService: SupabaseService,
    private _router: Router,
    ) {
    super(_formValidatorService);
  }

  public logInForm!: FormGroup;

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.logInForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ]),
    });
  }

  public async handleLogin(): Promise<void> {
    const loader = await this._superService.createLoader();
    await loader.present();
    try {
      const { data, error } = await this._superService.signIn(this.email?.value, this.password?.value);
      if (error) {
        throw error;
      }
      await loader.dismiss();
      this.navigateTo(['home','dashboard']);
    } catch (error: any) {
      await loader.dismiss();
      await this._superService.createNotice(error.error_description || error.message, "danger");
    }
  }

  public get email(): AbstractControl<any,any> | null {
    return this.logInForm.get('email');
  }

  public get password(): AbstractControl<any,any> | null {
    return this.logInForm.get('password');
  }

  public navigateTo(name: string[]) {
    this._router.navigate(name);
  }
  
}
