import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { ErrorpageComponent } from './pages/errorpage/errorpage.component';
import { SpeakerEditComponent } from './pages/speaker-edit/speaker-edit.component';
import { SpeakerCreateComponent } from './pages/speaker-create/speaker-create.component';
import { SpeakerListComponent } from './pages/speaker-list/speaker-list.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomepageComponent,
    ErrorpageComponent,
    SpeakerEditComponent,
    SpeakerCreateComponent,
    SpeakerListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
