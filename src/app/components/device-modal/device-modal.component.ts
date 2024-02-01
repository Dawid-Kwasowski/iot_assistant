import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { FormValidator } from 'src/app/bases/form-validator';
import { FormValidatorService } from 'src/app/services/form-validator.service';

@Component({
  selector: 'app-device-modal',
  templateUrl: './device-modal.component.html',
  styleUrls: ['./device-modal.component.scss'],
})
export class DeviceModalComponent extends FormValidator implements OnInit {

public deviceForm!: FormGroup;

public deviceTypes: string[] = [
  "smartsocket",
  "pir",
  "light"
];

constructor(
  public override _formValidatorService: FormValidatorService,
  private modalCtrl: ModalController,
  ) {
    super(_formValidatorService);
  }

  public ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.deviceForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      topic: new FormControl(null, [Validators.required]),
      type: new FormControl(null, [Validators.required])
    });
  }

  public get name(): AbstractControl<any,any> | null {
    return this.deviceForm.get('name');
  }

  public get topic(): AbstractControl<any,any> | null {
    return this.deviceForm.get('topic');
  }

  public get type(): AbstractControl<any,any> | null {
    return this.deviceForm.get('type');
  }


  public cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }
  public confirm() {
    const payload = { name: this.name?.value, type: this.type?.value, topic: this.topic?.value };
    return this.modalCtrl.dismiss(payload, 'confirm');
  }

}
