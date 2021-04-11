import { Component, OnInit } from '@angular/core';

import { SpeakerService } from "../../../services/speaker/speaker.service";
import { speakerFixture } from "../../../services/speaker/speakers.fixture";


@Component({
  selector: 'app-speaker-import',
  templateUrl: './speaker-import.component.html',
  styleUrls: ['./speaker-import.component.scss']
})
export class SpeakerImportComponent implements OnInit {

  constructor(private speakerService: SpeakerService) { }

  ngOnInit(): void {
  }

  importSpeakers() {
    this.speakerService.putSpeakers(speakerFixture);
  }

}
