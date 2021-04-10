import { Component, OnDestroy, OnInit} from '@angular/core';
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

import { SpeakerService } from "../../services/speaker/speaker.service";
import { AuthService } from "../../services/auth/auth.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {
  public isAuthenticated = false;
  private userSub: Subscription;

  constructor(private speakerService: SpeakerService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
      console.log('this.auth: ', this.isAuthenticated)
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  addSpeaker(e) {
    e.preventDefault();

    this.speakerService.setSpeakers();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
