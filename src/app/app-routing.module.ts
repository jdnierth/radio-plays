import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from "./pages/homepage/homepage.component";
import { ErrorpageComponent } from "./pages/errorpage/errorpage.component";
import { SpeakerCreateComponent } from "./pages/speaker/speaker-create/speaker-create.component";
import { SpeakerEditComponent } from "./pages/speaker/speaker-edit/speaker-edit.component";
import { SpeakerListComponent } from "./pages/speaker/speaker-list/speaker-list.component";
import { AuthpageComponent } from "./pages/authpage/authpage.component";
import { AuthGuardService } from "./services/auth/auth-guard.service";
import {SpeakerResolverService} from "./services/speaker/speaker-resolver.service";

const routes: Routes = [
  { path: 'homepage', component: HomepageComponent },
  {
    path: 'speaker',
    canActivate: [ AuthGuardService ],

    children: [
      {
        path: 'list',
        component: SpeakerListComponent,
        resolve: [ SpeakerResolverService ]
      },
      {
        path: 'create',
        component: SpeakerCreateComponent
      },
      {
        path: ':id/edit',
        component: SpeakerEditComponent,
        resolve: { speakers: SpeakerResolverService }
      },
    ]
  },
  { path: '', redirectTo: '/homepage', pathMatch: 'full' },
  { path: 'login', component: AuthpageComponent },
  { path: '**', component: ErrorpageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
