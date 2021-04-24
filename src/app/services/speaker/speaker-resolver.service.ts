import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable} from "rxjs";
import { filter, tap } from "rxjs/operators";

import { Speaker, Speakers } from "./speaker.model";
import { SpeakerService } from "./speaker.service";

@Injectable({
  providedIn: 'root'
})
export class SpeakerResolverService implements Resolve<Speakers>  {

  constructor(private speakerService: SpeakerService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Speakers> | Promise<Speakers> | Speakers {
    let speakers = this.speakerService.getSpeakers();

    if (Object.keys(speakers).length === 0) {
      return this.speakerService.fetchSpeakers()
        .pipe(
          filter(speakers => Object.keys(speakers).length > 0),
          tap(speakers => console.log('resolver speakers: ', speakers))
        );
    } else {
      console.log('resolver speakers:', speakers);
      return speakers;
    }
  }
}
