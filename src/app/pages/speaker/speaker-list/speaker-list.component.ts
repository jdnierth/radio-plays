import { Component, OnInit } from '@angular/core';

import { SpeakerService } from "../../../services/speaker/speaker.service";
import {Speaker} from "../../../services/speaker/speaker.model";

@Component({
  selector: 'app-speaker-list',
  templateUrl: './speaker-list.component.html',
  styleUrls: ['./speaker-list.component.scss']
})
export class SpeakerListComponent implements OnInit {
  speakers: Speaker[];
  subscription: any;

  constructor(private speakerService: SpeakerService) { }

  ngOnInit(): void {
    this.speakers = this.speakerService.getSpeakers();

    this.subscription = this.speakerService.speakers$
      .subscribe(
        (speakers: Speaker[]) => {
          this.speakers = speakers;
        }
      );

    this.speakerService.speakersChanged
      .subscribe((speakers:Speaker[]) => {
        this.speakers = speakers;
    });
  }
}
