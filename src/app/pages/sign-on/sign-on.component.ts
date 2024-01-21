import { Component, OnInit, ElementRef, ViewChildren } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import type { QueryList } from '@angular/core';
import type { Animation } from '@ionic/angular';
import { IonCard } from '@ionic/angular';
import { AnimationsService } from 'src/app/services/animations.service';

@Component({
  selector: 'app-sign-on',
  templateUrl: './sign-on.component.html',
  styleUrls: ['./sign-on.component.scss']
})
export class SignOnComponent implements OnInit {

  @ViewChildren(IonCard, { read: ElementRef }) cardElements!: QueryList<ElementRef<any>>;

  public signOnImgPath: string = '/assets/images/login.svg';
  public signOnForm!: FormGroup;

  public currentStep: number = 0;

  private cardA!: Animation;
  private cardB!: Animation;
  private cardC!: Animation;
  

  constructor(
    private formValidatorService: FormValidatorService,
    private animationService: AnimationsService
    ) { }
  ngOnInit(): void {
    this.initForm();
  }

  public async play(): Promise<void> {
    await this.cardA.play();
  }

  public async stop(): Promise<void> {
    this.cardA
  }

  public async nextStep(): Promise<void> {

    if(this.currentStep >= 2) {
      this.currentStep = 0; return;
    }
    const itemRef = this.cardElements?.get(this.currentStep)?.nativeElement;
    this.cardA = this.animationService.translateUpAnimation(itemRef)
    await this.play(); 
    this.currentStep++;
  }

  public prevStep(): void {
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
