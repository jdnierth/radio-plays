import { Component, OnInit } from '@angular/core';

import { SpeakerService } from "../../../services/speaker/speaker.service";
import { Speaker, Speakers } from "../../../services/speaker/speaker.model";

@Component({
  selector: 'app-speaker-list',
  templateUrl: './speaker-list.component.html',
  styleUrls: ['./speaker-list.component.scss']
})
export class SpeakerListComponent implements OnInit {
  speakers: Speakers;
  subscription: any;

  constructor(private speakerService: SpeakerService) { }

  ngOnInit(): void {
    this.speakers = this.speakerService.getSpeakers();

    this.subscription = this.speakerService.speakers$
      .subscribe(
        (speakers: Speakers) => {
          this.speakers = speakers;
        }
      );

    this.speakerService.speakersChanged
      .subscribe((speakers:Speakers) => {
        this.speakers = speakers;
    });
  }
}
