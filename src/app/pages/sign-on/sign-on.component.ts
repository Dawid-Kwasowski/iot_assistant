import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ViewWillLeave } from '@ionic/angular';
import { FormValidatorService } from 'src/app/services/form-validator.service';

@Component({
  selector: 'app-sign-on',
  templateUrl: './sign-on.component.html',
  styleUrls: ['./sign-on.component.scss']
})
export class SignOnComponent implements OnInit, ViewWillLeave {

  @ViewChild('loadingTemplate') loadingTemplate!: TemplateRef<any>;

  public signOnImgPath: string = '/assets/images/login.svg';
  public signOnForm!: FormGroup;

  public currentStep: number = 0;
  public registering: boolean = false;

  constructor(
    private formValidatorService: FormValidatorService,
    private router: Router
    ) { }
  ionViewWillLeave(): void {
    this.registering = false;
    console.log('ionViewWillLeave');
  }
  public navigateTo(name: string): void {
    this.registering = true;
    setTimeout((): void => {
      this.router.navigate([`/${name}`]);
    },4000);
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


  public get emailError(): string | undefined {
    const emailControl = this.email;
    if(emailControl?.getError('required')) return this.formValidatorService.getError('required');
    if(emailControl?.getError('email')) return this.formValidatorService.getError('email');
    return;
  }

  public get usernameError(): string | undefined {
    const usernameControl = this.username;
    if(usernameControl?.getError('required')) return this.formValidatorService.getError('required');
    return;
  }

  public get passwordError(): string | undefined {
    const passwordControl = this.password;
    if(passwordControl?.getError('required')) return this.formValidatorService.getError('required');
    if(passwordControl?.getError('minLength')) return this.formValidatorService.getError('minLength');
    return;
  }
}
