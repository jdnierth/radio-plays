import { Component, OnInit } from '@angular/core';
import {FormArray, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";

@Component({
  selector: 'app-speaker-create',
  templateUrl: './speaker-create.component.html',
  styleUrls: ['./speaker-create.component.scss']
})
export class SpeakerCreateComponent implements OnInit {

  createSpeakerForm: FormGroup;

  constructor() { }

  get firstname() {
    return this.createSpeakerForm.get('firstname') as FormControl;
  }

  get lastname() {
    return this.createSpeakerForm.get('lastname') as FormControl;
  }

  get aliases() {
    return this.createSpeakerForm.get('aliases') as FormArray;
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.createSpeakerForm = new FormGroup({
      "firstname": new FormControl(null, [Validators.required, Validators.minLength(3)]),
      "lastname": new FormControl(null, [Validators.required, Validators.minLength(3)]),
      "aliases": new FormArray([])
    })
  }

  addAliasControls() {
    const formControl = new FormControl(null, [Validators.required]);

    (<FormArray>this.aliases).push(formControl);
  }

  // Add a function to extract the error message for each control
  getError(formControlName: string): any {
    let message = '';
    const fieldLabel = formControlName.charAt(0).toUpperCase() + formControlName.slice(1);
    //Object.keys(this.createSpeakerForm.controls).forEach(formControlName => {
      const controlErrors: ValidationErrors = this.createSpeakerForm.get(formControlName).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          switch(keyError){
            case 'minlength':

              message = fieldLabel + ' has to have at least ' + controlErrors[keyError].requiredLength + ' characters';
              console.log('msg: ', message);
              break;
            default:
              message = fieldLabel + ' is required';
          }
          console.log('Key control: ' + formControlName + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);

        });
      }
    //});
    return message;
  }

  submitForm() {
    if(this.createSpeakerForm.valid) {
      // SUBMIT FORM
    }
  }
}
