import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomepageComponent} from "./pages/homepage/homepage.component";
import {SpeakerCreateComponent} from "./pages/speaker-create/speaker-create.component";


const routes: Routes = [
  { path: 'homepage', component: HomepageComponent },
  { path: 'speaker/create', component: SpeakerCreateComponent },
  { path: '', redirectTo: '/homepage', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
