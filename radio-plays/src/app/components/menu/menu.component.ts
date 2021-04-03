import { Component, OnInit } from '@angular/core';

import { SpeakerService } from "../../services/speaker.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(private speakerService: SpeakerService) { }

  ngOnInit(): void {
  }

  addSpeaker(e) {
    e.preventDefault();

    this.speakerService.setSpeakers();
  }

}
