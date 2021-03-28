import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import {filter, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-speaker-edit',
  templateUrl: './speaker-edit.component.html',
  styleUrls: ['./speaker-edit.component.scss']
})
export class SpeakerEditComponent implements OnInit {
  speakerId: number;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.speakerId = +this.route.snapshot.paramMap.get('id');
  }

}
