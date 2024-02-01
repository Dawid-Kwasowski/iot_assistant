import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { FormValidator } from 'src/app/bases/form-validator';
import { FormValidatorService } from 'src/app/services/form-validator.service';

@Component({
  selector: 'app-command-modal',
  templateUrl: './command-modal.component.html',
  styleUrls: ['./command-modal.component.scss'],
})
export class CommandModalComponent extends FormValidator  implements OnInit {

  public commandForm!: FormGroup;

  constructor(
    public override _formValidatorService: FormValidatorService,
    private modalCtrl: ModalController,
  ) {
    super(_formValidatorService);
  }

  ngOnInit() {
    this.initForm();
  }

  private initForm(): void {
    this.commandForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      command: new FormControl(null, [Validators.required]),
    });
  }


  public get name(): AbstractControl<any,any> | null {
    return this.commandForm.get('name');
  }

  public get command(): AbstractControl<any,any> | null {
    return this.commandForm.get('command');
  }


  public cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  public confirm() {
    const payload = { name: this.name?.value, command: this.command?.value };
    return this.modalCtrl.dismiss(payload, 'confirm');
  }
}
