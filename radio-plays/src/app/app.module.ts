import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { SpeakerComponent } from './pages/speaker/speaker.component';
import { SpeakerEditComponent } from './pages/speaker-edit/speaker-edit.component';
import { SpeakerCreateComponent } from './pages/speaker-create/speaker-create.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomepageComponent,
    SpeakerComponent,
    SpeakerEditComponent,
    SpeakerCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
