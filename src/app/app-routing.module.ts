import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthpageComponent } from "./pages/authpage/authpage.component";
import { AuthGuardService } from "./services/auth/auth-guard.service";

import { HomepageComponent } from "./pages/homepage/homepage.component";
import { ErrorpageComponent } from "./pages/errorpage/errorpage.component";

import { SpeakerResolverService } from "./services/speaker/speaker-resolver.service";
import { SpeakerCreateComponent } from "./pages/speaker/speaker-create/speaker-create.component";
import { SpeakerEditComponent } from "./pages/speaker/speaker-edit/speaker-edit.component";
import { SpeakerListComponent } from "./pages/speaker/speaker-list/speaker-list.component";
import { CanDeactivateGuard } from "./pages/speaker/speaker-edit/can-deactivate-guard.service";
import { SpeakerImportComponent } from "./pages/speaker/speaker-import/speaker-import.component";

const routes: Routes = [
  { path: 'homepage', component: HomepageComponent },
  {
    path: 'speaker',
    canActivate: [ AuthGuardService ],
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'prefix'
      },
      {
        path: 'import',
        component: SpeakerImportComponent
      },
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
        resolve: { speakers: SpeakerResolverService },
        canDeactivate: [ CanDeactivateGuard ]
      },
    ]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: AuthpageComponent },
  { path: '**', component: ErrorpageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
