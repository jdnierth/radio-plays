import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

import { SpeakerService } from "../../../services/speaker/speaker.service";
import { Speaker, Speakers } from "../../../services/speaker/speaker.model";
import { SpeakersDataSource } from "../../../services/speakerCDKDataSource/speakerCDKDataSource";
import { speakerFixture } from "../../../services/speaker/speakers.fixture";

@Component({
  selector: 'app-speaker-list',
  templateUrl: './speaker-list.component.html',
  styleUrls: ['./speaker-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class SpeakerListComponent implements OnInit {
  speakers: Speakers;
  subscription: any;

  dataSource: SpeakersDataSource;
  speakerList: Speaker[] = Object.keys(speakerFixture).map(k => speakerFixture[k]);
  displayedColumns = ["Firstname", "Lastname", "Action"];
  expandedElement: Speaker | null;

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
      .subscribe((speakers: Speakers) => {
        this.speakers = speakers;
      });

    this.dataSource = new SpeakersDataSource(this.speakerService);

    this.dataSource.loadSpeakers();
  }

  // Watchers
  actionOnRow(actionType: string, element: SpeakersDataSource, e) {
    e.stopPropagation();
    console.log('args: ', arguments);

    switch(actionType) {
      case 'Edit':
        this.expandRow(this.expandedElement, element);
        break;
      default:

    }
  }

  expandRow(expandedElement, element) {
    console.log('args: ', arguments, 'this expanded: ', this.expandedElement);
    return expandedElement === element ? null : element;
  }
}
