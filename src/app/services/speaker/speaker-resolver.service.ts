import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable} from "rxjs";
import { filter, tap } from "rxjs/operators";

import { Speaker } from "./speaker.model";
import { SpeakerService } from "./speaker.service";

@Injectable({
  providedIn: 'root'
})
export class SpeakerResolverService implements Resolve<Speaker[]>  {

  constructor(private speakerService: SpeakerService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Speaker[]> | Promise<Speaker[]> | Speaker[] {
    let speakers = this.speakerService.getSpeakers();

    if (speakers.length === 0) {
      return this.speakerService.fetchSpeakers()
        .pipe(
          tap(speakers => console.log('resolver speakers: ', speakers)),
          filter(speakers => speakers.length > 0)
        );
    } else {
      console.log('resolver speakers:', speakers);
      return speakers;
    }
  }
}
