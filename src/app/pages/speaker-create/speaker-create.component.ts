import { Component, OnInit } from '@angular/core';
import {FormArray, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {FormsService} from "../../services/forms.service";

@Component({
  selector: 'app-speaker-create',
  templateUrl: './speaker-create.component.html',
  styleUrls: ['./speaker-create.component.scss']
})
export class SpeakerCreateComponent implements OnInit {

  createSpeakerForm: FormGroup;

  constructor(private formsService: FormsService) { }

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
      "firstname": new FormControl(null, [Validators.required, Validators.pattern(/^[a-zA-Z]+$/), Validators.minLength(3)]),
      "lastname": new FormControl(null, [Validators.required, Validators.pattern(/^[a-zA-Z]+$/), Validators.minLength(3)]),
      "aliases": new FormArray([])
    })
  }

  addAliasControls() {
    const formControl = new FormControl(null, [Validators.required]);

    (<FormArray>this.aliases).push(formControl);
  }

  // Add a function to extract the error message for each control
  getErrorMsg(formControlName: string): any {
    return this.formsService.getErrorMsg(this.createSpeakerForm, formControlName);
  }


  submitForm() {
    if(this.createSpeakerForm.valid) {
      // SUBMIT FORM
    }
  }
}
