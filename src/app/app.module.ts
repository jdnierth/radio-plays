import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";

import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { ErrorpageComponent } from './pages/errorpage/errorpage.component';
import { SpeakerEditComponent } from './pages/speaker/speaker-edit/speaker-edit.component';
import { SpeakerCreateComponent } from './pages/speaker/speaker-create/speaker-create.component';
import { SpeakerListComponent } from './pages/speaker/speaker-list/speaker-list.component';

import { environment } from "../environments/environment";
import { FooterComponent } from './components/footer/footer.component';
import { AuthpageComponent } from "./pages/authpage/authpage.component";
import { AuthInterceptorService } from "./services/auth/auth-interceptor.service";
import { SpeakerComponent } from "./pages/speaker/container-component/speaker.component";

@NgModule({
  declarations: [
    MenuComponent,
    AppComponent,
    HomepageComponent,
    ErrorpageComponent,
    FooterComponent,
    AuthpageComponent,

    SpeakerComponent,
    SpeakerCreateComponent,
    SpeakerEditComponent,
    SpeakerListComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AppRoutingModule,
    AngularFirestoreModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
