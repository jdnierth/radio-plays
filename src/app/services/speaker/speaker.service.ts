import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AngularFirestore } from '@angular/fire/firestore';
import {Observable, Subject} from "rxjs";

import { environment } from "../../../environments/environment";

import { speakerFixture } from "./speakers.fixture";
import {Speaker} from "./speaker.model";
import {map, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SpeakerService {
  speakers$ = new Subject<Speaker[]>();
  private speakers: Speaker[] = [];

  private speakersDBUrl = environment.firebase.databaseURL + '/speakers.json';

  items: Observable<any[]>;

  constructor(private http: HttpClient, private firestore: AngularFirestore) {}

  putSpeakers() {
    this.http.put(this.speakersDBUrl, speakerFixture)
      .subscribe(response  => {
        console.log('Response: ', response);
      });
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
        })
      );
  }

  getSpeakers() {
    return this.speakers;
  }

  setSpeakers(speakers:Speaker[]) {
    this.speakers = speakers;
    this.speakers$.next(this.speakers.slice());
  }

  getSpeaker(id: number) {
    return this.speakers[id];
  }
}
