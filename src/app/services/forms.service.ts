import { Injectable } from '@angular/core';
import {FormControl, FormGroup, ValidationErrors} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class FormsService {

  constructor() { }

  getErrorMsgFromControl(formControlLabel: string, formControl: FormControl): string {
    let message = '';

    Object.keys(formControl.errors).forEach(keyError => {
      message = this.calculateErrorMessage(formControlLabel, keyError, formControl.errors);
    });

    return message;
  }

  calculateErrorMessage(formControlName: string, keyError: string, controlErrors: ValidationErrors) {
    let message = '';

    const fieldLabel = formControlName.charAt(0).toUpperCase() + formControlName.slice(1);

    switch(keyError){
      case 'required':
        message = fieldLabel + ' is required';
        break;
      case 'minlength':
        message = fieldLabel + ' has to have at least ' + controlErrors[keyError].requiredLength + ' characters';
        break;
      case 'maxlength':
        message = fieldLabel + ' can not be longer than ' + controlErrors[keyError].requiredLength + ' characters';
        break;
      case 'pattern':
        message = fieldLabel + ' can only contain characters';
        break;
      default:
        message = controlErrors[keyError];
    }

    return message
  }
}
