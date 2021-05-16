import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { SpeakerService } from "../../../services/speaker/speaker.service";
import { Speaker } from "../../../services/speaker/speaker.model";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-speaker-list',
  templateUrl: './speaker-list.component.html',
  styleUrls: ['./speaker-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class SpeakerListComponent implements OnInit {
  speakerList: Speaker[];
  displayedColumns = ["Firstname", "Lastname", "Action"];
  expandedElement: Speaker | null;

  constructor(private speakerService: SpeakerService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.speakerList = this.activatedRoute.snapshot.data.speakers;

    this.speakerService.speakersChanged
      .subscribe((speakers: Speaker[]) => {
        console.log('speakers changed: ', speakers);
        this.speakerList = speakers;
      });
  }

  // Watchers
  actionOnRow(actionType: string, element: Speaker, e) {
    e.stopPropagation();

    switch(actionType) {
      case 'Edit':
        this.expandRow(this.expandedElement, element);
        break;
      case 'Delete':
        break;
      default:

    }
  }

  expandRow(expandedElement, element) {
    return expandedElement === element ? null : element;
  }
}
