import { AbstractControl } from "@angular/forms";
import { FormValidatorService } from "../services/form-validator.service";

export class FormValidator {
   constructor(protected _formValidatorService: FormValidatorService ) {}

   public emailError(controlName: AbstractControl<any, any> | null): string | undefined {
      const emailControl = controlName;
      if(emailControl?.getError('required')) return this._formValidatorService.getError('required');
      if(emailControl?.getError('email')) return this._formValidatorService.getError('email');
      return;
    }


    public nameError(controlName: AbstractControl<any, any> | null): string | undefined {
      const usernameControl = controlName;
      if(usernameControl?.getError('required')) return this._formValidatorService.getError('required');
      return;
    }
  
    public passwordError(controlName: AbstractControl<any, any> | null): string | undefined {
      const passwordControl = controlName;
      if(passwordControl?.getError('required')) return this._formValidatorService.getError('required');
      if(passwordControl?.getError('minLength')) return this._formValidatorService.getError('minLength');
      return;
    }
}
