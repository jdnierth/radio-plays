import {Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from "rxjs";

import { SpeakerService } from "../../services/speaker.service";
import { AuthService } from "../../services/auth/auth.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {
  public isAuthenticated = false;
  private userSub: Subscription;

  constructor(private speakerService: SpeakerService, private authService: AuthService) { }

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => this.isAuthenticated = !!user);
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  addSpeaker(e) {
    e.preventDefault();

    this.speakerService.setSpeakers();
  }

}
