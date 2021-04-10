import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { filter, switchMap } from "rxjs/operators";
import { Observable } from "rxjs";

import { SpeakerService } from "../../../services/speaker/speaker.service";

@Component({
  selector: 'app-speaker-edit',
  templateUrl: './speaker-edit.component.html',
  styleUrls: ['./speaker-edit.component.scss']
})
export class SpeakerEditComponent implements OnInit {
  speakerId: number;
  speakers$: Observable<any>;

  constructor(private route: ActivatedRoute, private speakerService: SpeakerService) {}

  ngOnInit(): void {
    this.speakerId = +this.route.snapshot.paramMap.get('id');

    this.speakers$ = this.route.paramMap.pipe(
      filter(params => params != null),
      switchMap(params => {
          this.speakerId = Number(params.get('id'));
          return this.speakerService.getSpeakers();
        }
      )
    );

  }

}
