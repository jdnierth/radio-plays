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
  speakers$ = new Subject<Speakers>();
  speakersChanged = new EventEmitter<Speakers>();

  private speakers: Speakers = {};

  private speakersDBUrl = environment.firebase.databaseURL + '/speakers.json';

  items: Observable<any[]>;

  constructor(private http: HttpClient, private firestore: AngularFirestore) {}

  putSpeakers(speakers:Speakers) {
    this.http.put(this.speakersDBUrl, speakers)
      .subscribe(response  => {
        console.log('Update all speakers Response: ', response);
        this.speakersChanged.emit({...this.speakers});
      });
  }

  putSpeaker(speaker: Speaker) {
    this.speakers = { ...this.speakers };
    this.speakers[speaker.id] = speaker;

    this.http.put(this.speakersDBUrl, this.speakers)
    .subscribe(response  => {
      console.log('Update one speaker Response: ', response);
      this.speakersChanged.emit({...this.speakers});
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

        this.speakersChanged.emit(this.speakers);
      });
  }

  updateSpeaker(speaker: Speaker) {
    //firebase.database().ref('users/' + userId).set(
  }

  fetchSpeakers() {
    return this.http.get<Speakers>(this.speakersDBUrl)
      .pipe(
        tap(speakers => {
          this.setSpeakers(speakers);
          this.speakersChanged.emit({...this.speakers});
        })
      );
  }

  getSpeakers():any {
    return this.speakers;
  }

  setSpeakers(speakers:Speakers) {
    this.speakers = speakers;
    this.speakers$.next(this.speakers);
    this.speakersChanged.emit({...this.speakers});
  }

  getSpeaker(id: string) {
    return this.speakers[id];
  }
}
