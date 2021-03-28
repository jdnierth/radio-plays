import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-speaker-edit',
  templateUrl: './speaker-edit.component.html',
  styleUrls: ['./speaker-edit.component.scss']
})
export class SpeakerEditComponent implements OnInit {
  speakerId: number;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.queryParams.pipe(
      filter(params => params.id != null)
    ).subscribe(params => {
      this.speakerId = +params.id;
    });
  }

}
