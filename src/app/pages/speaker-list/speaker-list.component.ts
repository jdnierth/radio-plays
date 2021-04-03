import { Component, OnInit } from '@angular/core';

import { Observable } from "rxjs";

import { SpeakerService } from "../../services/speaker.service";

@Component({
  selector: 'app-speaker-list',
  templateUrl: './speaker-list.component.html',
  styleUrls: ['./speaker-list.component.scss']
})
export class SpeakerListComponent implements OnInit {
  speakers$: Observable<any>;

  constructor(private speakerService: SpeakerService) { }

  ngOnInit(): void {
    this.speakers$ = this.speakerService.getSpeakers();
  }


}
