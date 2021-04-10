import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Route, Router} from "@angular/router";

import {filter, map, switchMap, take, tap} from "rxjs/operators";
import { Observable } from "rxjs";

import { SpeakerService } from "../../../services/speaker/speaker.service";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {FormsService} from "../../../services/forms/forms.service";
import {Speaker} from "../../../services/speaker/speaker.model";

@Component({
  selector: 'app-speaker-edit',
  templateUrl: './speaker-edit.component.html',
  styleUrls: ['./speaker-edit.component.scss']
})
export class SpeakerEditComponent implements OnInit {
  speakerId: number;
  editSpeakerForm: FormGroup;
  isLoading: true;

  constructor(private activatedRoute: ActivatedRoute,
              private speakerService: SpeakerService,
              private formService: FormsService) {}

  ngOnInit(): void {
    this.createForm(null);

    this.activatedRoute.paramMap.pipe(
      filter(params => params != null),
      map( params => +params.get('id'))
    )
    .subscribe((id:number) =>  {
      this.speakerId = id;
      let currentSpeaker = this.speakerService.getSpeaker(id);
      this.createForm(currentSpeaker);
    }
    );
  }

  get firstname() {
    return this.editSpeakerForm.get('firstname') as FormControl;
  }

  get lastname() {
    return this.editSpeakerForm.get('lastname') as FormControl;
  }

  get aliases() {
    return this.editSpeakerForm.get('aliases') as FormArray;
  }

  createForm(speaker: Speaker) {
    let firstname = '';
    let lastname = '';

    if(speaker) {
      firstname = speaker.firstname;
      lastname = speaker.lastname;
    }

    this.editSpeakerForm = new FormGroup({
      "firstname": new FormControl(firstname, [Validators.required, Validators.pattern(/^[a-zA-Z]+$/), Validators.minLength(3)]),
      "lastname": new FormControl(lastname, [Validators.required, Validators.pattern(/^[a-zA-Z]+$/), Validators.minLength(3)]),
      "aliases": new FormArray([])
    })
  }

  getErrorMsgFromControl(formControlLabel: string, formControl: FormControl): string {
    return this.formService.getErrorMsgFromControl(formControlLabel, formControl);
  }

  submitForm() {
    if(this.editSpeakerForm.valid) {
      // SUBMIT FORM
    }
  }
}
