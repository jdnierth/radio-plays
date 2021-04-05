import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { FormsService } from "../../services/forms.service";

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
    const formControl = new FormControl(null, [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]);

    (<FormArray>this.aliases).push(formControl);
  }

  getErrorMsgFromControl(formControlLabel: string, formControl: FormControl): string {
    return this.formsService.getErrorMsgFromControl(formControlLabel, formControl);
  }

  submitForm() {
    if(this.createSpeakerForm.valid) {
      // SUBMIT FORM
    }
  }
}
