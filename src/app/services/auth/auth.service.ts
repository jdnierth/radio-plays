import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { throwError, BehaviorSubject } from "rxjs";
import { catchError, tap } from "rxjs/operators";

import { environment } from "../../../environments/environment";

import { AuthResponseData } from "./auth.response.model";
import { User } from "./user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient) {
    this.user = new BehaviorSubject<User>(this.getPersistedLoggedInUser());
  }

  signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>(environment.firebaseSettings.url +
      'accounts:signUp?key=' + environment.firebaseSettings.key, {
      email,
      password,
      returnSecureToken: true
    });
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        environment.firebaseSettings.url +
      'accounts:signInWithPassword?key=' + environment.firebaseSettings.key, {
      email,
      password,
      returnSecureToken: true
      })
      .pipe(
        tap(resData => {
          this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
        }),
        catchError(this.handleError)
      );
  }

  logout() {
    this.user.next(null);
    localStorage.removeItem('userData');
  }

  handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);

    if(user) {
      this.persistLoggedInUser(user);
      this.user.next(user);
    }
  }

  persistLoggedInUser(user: User) {
    localStorage.setItem('userData', JSON.stringify(user));
  }

  getPersistedLoggedInUser(): User {
    const userFromStorage = JSON.parse(localStorage.getItem('userData')) || null;
    let user: User = null;

    if(userFromStorage) {
      user = new User(
        userFromStorage.email,
        userFromStorage.id,
        userFromStorage._token,
        new Date(userFromStorage._tokenExpirationDate)
      );
    }

    if(!user?.token) {
      this.logout();
    }

    return user;
  }

  handleError(errorRes) {
    console.log(errorRes)
    let errorMsg = 'An unknown error occurred';

    if(!errorRes.error || !errorRes.error.error) {
      return throwError(errorMsg);
    }

    switch(errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMsg = 'This email already exists';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMsg = 'This email doesn\'t exist';
        break;
      case 'INVALID_PASSWORD':
        errorMsg = 'The password is invalid';
        break;
    }

    return throwError(errorMsg);
  }
}
