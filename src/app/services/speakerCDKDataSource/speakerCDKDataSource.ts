import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import { BehaviorSubject, Observable, of } from "rxjs";

import { Speaker } from "../speaker/speaker.model";
import { SpeakerService } from "../speaker/speaker.service";
import { catchError, map, tap } from "rxjs/operators";

export class SpeakersDataSource implements DataSource<Speaker> {

  private speakersSubject = new BehaviorSubject<Speaker[]>([]);

  constructor(private speakerService: SpeakerService) {}

  connect(collectionViewer: CollectionViewer): Observable<Speaker[]> {
    return this.speakersSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.speakersSubject.complete();
  }

  loadSpeakers() {
    this.speakerService.fetchSpeakers()
      .pipe(
        tap(data => console.log('data: ',data)),
        map( data => Object.keys(data).map(k => data[k])),
        catchError(() => of([]))
    ).subscribe(speakers => this.speakersSubject.next(speakers));
  }

  /*
  loadSpeakers(speakerId: string, filter: string, sortDirection: string = 'asc', pageIndex: number = 0, pageSize:
   number = 3) {
    this.speakerService.fetchSpeakers(speakerId, filter, sortDirection, pageIndex, pageSize)
      .pipe(
        catchError(() => of([]))
    ).subscribe(speakers => this.speakersSubject.next(speakers));
  }*/
}
