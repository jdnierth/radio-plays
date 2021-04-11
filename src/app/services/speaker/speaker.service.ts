import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subject } from "rxjs";
import { map, tap } from "rxjs/operators";

import { environment } from "../../../environments/environment";

import { Speaker } from "./speaker.model";

@Injectable({
  providedIn: 'root'
})
export class SpeakerService {
  speakers$ = new Subject<Speaker[]>();
  speakersChanged = new EventEmitter<Speaker[]>();

  private speakers: Speaker[] = [];

  private speakersDBUrl = environment.firebase.databaseURL + '/speakers.json';

  items: Observable<any[]>;

  constructor(private http: HttpClient, private firestore: AngularFirestore) {}

  putSpeakers(speaker: Speaker[]) {
    this.http.put(this.speakersDBUrl, speaker)
      .subscribe(response  => {
        console.log('Response: ', response);
        this.speakersChanged.emit(this.speakers.slice());
      });
  }

  updateSpeaker(speaker: Speaker) {
    //firebase.database().ref('users/' + userId).set(
  }

  fetchSpeakers() {
    return this.http.get<Speaker[]>(this.speakersDBUrl)
      .pipe(
        map(speakers => {
          return speakers.map(speaker => {
            return {
              ...speaker,
            };
          });
        }),
        tap(speakers => {
          this.setSpeakers(speakers);
          this.speakersChanged.emit(this.speakers.slice());
        })
      );
  }

  getSpeakers() {
    return this.speakers.slice();
  }

  setSpeakers(speakers:Speaker[]) {
    this.speakers = speakers;
    this.speakers$.next(this.speakers.slice());
    this.speakersChanged.emit(this.speakers.slice());
  }

  getSpeaker(id: number) {
    return this.speakers[id];
  }
}
