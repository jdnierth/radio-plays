import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from "rxjs";

import { environment } from "../../../environments/environment";

import { speakerFixture } from "./speakers.fixture";

@Injectable({
  providedIn: 'root'
})
export class SpeakerService {

  private speakersDBUrl = environment.firebase.databaseURL + '/speakers.json';

  items: Observable<any[]>;

  constructor(private http: HttpClient, private firestore: AngularFirestore) {}

  setSpeakers() {
    this.http.put(this.speakersDBUrl, speakerFixture)
      .subscribe(response  => {
        console.log('Response: ', response);
      });
  }

  getSpeakers() {
    return this.http.get(this.speakersDBUrl);
  }
}
