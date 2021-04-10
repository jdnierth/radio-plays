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
import { SpeakerEditComponent } from './pages/speaker-edit/speaker-edit.component';
import { SpeakerCreateComponent } from './pages/speaker-create/speaker-create.component';
import { SpeakerListComponent } from './pages/speaker-list/speaker-list.component';

import { environment } from "../environments/environment";
import { FooterComponent } from './components/footer/footer.component';
import { AuthpageComponent } from "./pages/authpage/authpage.component";
import { AuthInterceptorService } from "./services/auth/auth-interceptor.service";

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomepageComponent,
    ErrorpageComponent,
    SpeakerEditComponent,
    SpeakerCreateComponent,
    SpeakerListComponent,
    FooterComponent,
    AuthpageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
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
