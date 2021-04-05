import { Injectable } from '@angular/core';
import {FormGroup, ValidationErrors} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class FormsService {

  constructor() { }

  getErrorMsg(form: FormGroup, formControlName: string):string {
    console.log('a');
    const fieldLabel = formControlName.charAt(0).toUpperCase() + formControlName.slice(1);

    let message = '';

    const controlErrors: ValidationErrors = form.get(formControlName).errors;

    if (controlErrors != null) {
      Object.keys(controlErrors).forEach(keyError => {

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

        console.log('Key control: ' + formControlName + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
      });
    }

    return message;
  }
}
