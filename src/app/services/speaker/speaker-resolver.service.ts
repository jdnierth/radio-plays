import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable} from "rxjs";
import { filter, map, tap } from "rxjs/operators";

import { Speaker, Speakers } from "./speaker.model";
import { SpeakerService } from "./speaker.service";

@Injectable({
  providedIn: 'root'
})
export class SpeakerResolverService implements Resolve<Speaker[]>  {

  constructor(private speakerService: SpeakerService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Speaker[]> | Promise<Speaker[]> | Speaker[] {
    let speakers = this.speakerService.getSpeakers();

    if (Object.keys(speakers).length === 0) {
      return this.speakerService.fetchSpeakers()
        .pipe(
          filter(speakers => Object.keys(speakers).length > 0),
          map((speakers => Object.keys(speakers).map((id) => speakers[id]))),
          tap(speakers => console.log('resolver speakers 1: ', speakers))
        );
    } else {
      console.log('resolver speakers 2:', speakers);
      return speakers;
    }
  }
}
