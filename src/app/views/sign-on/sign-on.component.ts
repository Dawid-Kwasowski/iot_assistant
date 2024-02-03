import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormValidator } from 'src/app/bases/form-validator';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { SupabaseService } from 'src/app/services/supabase/supabase.service';

@Component({
  selector: 'app-sign-on',
  templateUrl: './sign-on.component.html',
  styleUrls: ['./sign-on.component.scss']
})
export class SignOnComponent extends FormValidator implements OnInit {

  @ViewChild('loadingTemplate') loadingTemplate!: TemplateRef<any>;

  public signOnImgPath: string = '/assets/images/login.svg';
  public signOnForm!: FormGroup;

  public currentStep: number = 0;

  constructor(
    public override _formValidatorService: FormValidatorService,
    private _superService: SupabaseService,
    private _router: Router
  ) {
    super(_formValidatorService);
  }

  public async handleSignUp(): Promise<void> {
    const loader = await this._superService.createLoader();
    await loader.present();

    try {
      const { data, error } = await this._superService.signUp({
        email: this.email?.value,
        password: this.password?.value,
      });
      await loader.dismiss();
      this.navigateTo(['home','dashboard']);
    } catch (error: any) {
      await loader.dismiss();
      await this._superService.createNotice(error.error_description || error.message, "danger");
    }
  }
  
  public navigateTo(name: string[]): void {
    this._router.navigate(name);
  }

  ngOnInit(): void {
    this.initForm();
  }

  public async nextStep(): Promise<void> {
    if(this.currentStep >= 2) {
      this.currentStep = 0; return;
    }

    this.currentStep++;
  }

  public async prevStep() {
    if(this.currentStep <= 0) {
      this.currentStep = 0; return;
    }
    this.currentStep--;
  }
  
  private initForm(): void {
    this.signOnForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email,
      ]),
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ]),
    })
  }

    public get disableActions(): any {
    const conditions: { [key: number]: ValidationErrors | null | undefined }  = {
      0: this.username?.errors,
      1: this.email?.errors,
      // Add conditions for other steps as needed
    };
  
    return conditions[this.currentStep];
  }

  public get email(): AbstractControl<any,any> | null {
    return this.signOnForm.get('email');
  }

  public get password(): AbstractControl<any,any> | null {
    return this.signOnForm.get('password');
  }

  public get username(): AbstractControl<any,any> | null {
    return this.signOnForm.get('username');
  }
}
