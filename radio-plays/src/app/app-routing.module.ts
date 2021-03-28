import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomepageComponent} from "./pages/homepage/homepage.component";
import {SpeakerCreateComponent} from "./pages/speaker-create/speaker-create.component";
import {SpeakerEditComponent} from "./pages/speaker-edit/speaker-edit.component";
import {ErrorpageComponent} from "./pages/errorpage/errorpage.component";
import {SpeakerListComponent} from "./pages/speaker-list/speaker-list.component";

const routes: Routes = [
  { path: 'homepage', component: HomepageComponent },
  { path: 'speaker', redirectTo: 'speaker/list' },
  { path: 'speaker/list', component: SpeakerListComponent },
  { path: 'speaker/create', component: SpeakerCreateComponent },
  { path: 'speaker/edit/:id', component: SpeakerEditComponent },
  { path: '', redirectTo: '/homepage', pathMatch: 'full' },
  { path: '**', component: ErrorpageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
