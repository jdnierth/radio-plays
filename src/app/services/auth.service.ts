import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AuthResponseData } from "./auth.response.model";
import { environment } from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>(environment.firebaseSettings.url +
      'accounts:signUp?key=' + environment.firebaseSettings.key, {
      email,
      password,
      returnSecureToken: true
    });

  }
  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(environment.firebaseSettings.url +
      'accounts:signInWithPassword?key=' + environment.firebaseSettings.key, {
      email,
      password
    });
  }
}
