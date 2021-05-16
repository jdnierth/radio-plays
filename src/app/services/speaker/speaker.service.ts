import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subject } from "rxjs";
import { tap } from "rxjs/operators";

import { environment } from "../../../environments/environment";

import { Speaker, Speakers } from "./speaker.model";

@Injectable({
  providedIn: 'root'
})
export class SpeakerService {
  speakers$ = new Subject<Speaker[]>();
  speakersChanged = new EventEmitter<Speaker[]>();

  private speakers: Speakers = {};
  private speakersList: Speaker[];

  private speakersDBUrl = environment.firebase.databaseURL + '/speakers.json';

  items: Observable<any[]>;

  constructor(private http: HttpClient, private firestore: AngularFirestore) {}

  putSpeakers(speakers:Speakers) {
    this.http.put(this.speakersDBUrl, speakers)
      .subscribe((speakers: Speakers)  => {
        console.log('Update all speakers Response: ', speakers);
        //this.speakersChanged.emit({...this.speakers});
        this.setSpeakers(speakers);
      });
  }

  putSpeaker(speaker: Speaker) {
    this.speakers = { ...this.speakers };
    this.speakers[speaker.id] = speaker;

    this.http.put(this.speakersDBUrl, this.speakers)
    .subscribe((speakers: Speakers)  => {
      console.log('Update one speaker Response: ', speakers);
      //this.speakersChanged.emit({...this.speakers});
      this.setSpeakers(speakers);
    });
  }

  postSpeaker(speaker: Speaker) {
    this.http.post(this.speakersDBUrl, speaker)
      .pipe(
        tap(data => console.log(data))
      )
      .subscribe(response  => {
        let newSpeaker = {...speaker};
        newSpeaker.id = response['name'];

        this.speakers[newSpeaker.id] = newSpeaker;

        this.putSpeaker(newSpeaker);
        this.setSpeakers(this.speakers);

      });
  }

  fetchSpeakers() {
    return this.http.get<Speakers>(this.speakersDBUrl)
      .pipe(
        tap(speakers => {
          this.setSpeakers(speakers);
        })
      );
  }

  getSpeakers():Speaker[] {
    return Object.keys(this.speakers).map((speakerId) => this.speakers[speakerId]);
  }

  setSpeakers(speakers: Speakers) {
    this.speakers = speakers;
    this.speakersList = this.getSpeakers();
    this.speakers$.next(this.speakersList);
    this.speakersChanged.emit(this.speakersList);
  }

  getSpeaker(id: string) {
    return this.speakers[id];
  }
}
