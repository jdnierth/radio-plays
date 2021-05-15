import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatTabsModule } from "@angular/material/tabs";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";

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
import { SpeakerImportComponent } from './pages/speaker/speaker-import/speaker-import.component';
import { SpeakerComponent } from "./pages/speaker/container-component/speaker.component";

import { environment } from "../environments/environment";
import { FooterComponent } from './components/footer/footer.component';
import { AuthpageComponent } from "./pages/authpage/authpage.component";
import { AuthInterceptorService } from "./services/auth/auth-interceptor.service";
import { CanDeactivateGuard } from "./pages/speaker/speaker-edit/can-deactivate-guard.service";

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
    SpeakerListComponent,
    SpeakerImportComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AppRoutingModule,
    AngularFirestoreModule,

    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    CanDeactivateGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
