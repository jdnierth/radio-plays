import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

import { filter, map } from "rxjs/operators";

import { SpeakerService } from "../../../services/speaker/speaker.service";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { FormsService } from "../../../services/forms/forms.service";
import { Speaker } from "../../../services/speaker/speaker.model";
import { CanComponentDeactivated } from "./can-deactivate-guard.service";
import { Observable } from "rxjs";

@Component({
  selector: 'app-speaker-edit',
  templateUrl: './speaker-edit.component.html',
  styleUrls: ['./speaker-edit.component.scss']
})
export class SpeakerEditComponent implements OnInit, CanComponentDeactivated {
  speakerId: string;
  editSpeakerForm: FormGroup;
  currentSpeaker: Speaker;
  isLoading: true;
  changesSaved = false; // Making sure the user can not navigate away before hitting 'save'

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private speakerService: SpeakerService,
              private formService: FormsService) {}

  ngOnInit(): void {
    this.createForm(null);


    this.activatedRoute.paramMap.pipe(
      filter(params => params != null),
      map( params => params.get('id'))
    )
    .subscribe((id:string) =>  {
      this.speakerId = id;
      this.currentSpeaker = this.speakerService.getSpeaker(id);
      this.createForm(this.currentSpeaker);
    });
  }

  get id() {
    return this.editSpeakerForm.get('id') as FormControl;
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
    let id = '';
    let firstname = '';
    let lastname = '';

    if(speaker) {
      id = speaker.id;
      firstname = speaker.firstname;
      lastname = speaker.lastname;
    }

    this.editSpeakerForm = new FormGroup({
      "id": new FormControl(id, [Validators.required]),
      "firstname": new FormControl(firstname, [Validators.required, Validators.pattern(/^[a-zA-Z]+$/), Validators.minLength(3)]),
      "lastname": new FormControl(lastname, [Validators.required, Validators.minLength(3)]),
      "aliases": new FormArray([])
    })
  }

  getErrorMsgFromControl(formControlLabel: string, formControl: FormControl): string {
    return this.formService.getErrorMsgFromControl(formControlLabel, formControl);
  }

  submitForm() {
    if(this.editSpeakerForm.valid) {

      const speaker = this.editSpeakerForm.value;
      this.speakerService.putSpeaker(speaker);
      this.changesSaved = true;
      this.router.navigate(['../../list'], { relativeTo: this.activatedRoute });
    }
  }

  resetForm() {
    this.editSpeakerForm.patchValue({
      firstname: this.currentSpeaker.firstname,
      lastname: this.currentSpeaker.lastname,
      aliases: []
    });
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if(this.editSpeakerForm.touched && this.editSpeakerForm.dirty && !this.changesSaved) {
      return confirm("Do you want to save your changes?");
    } else {
      return true;
    }
  }
}
