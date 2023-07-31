import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, take } from 'rxjs';

@Injectable()
export class AuthService {
  private token: string = '';
  public isAuthenticated: boolean = false;
  constructor(private readonly http: HttpClient) {
    this.getToken();
  }

  login(email: string, password: string): Observable<boolean> {
    const authData = { email: email, password: password };
    return this.http
      .post<{ token: string }>(
        'http://localhost:8080/api/v1/auth/authenticate',
        authData
      )
      .pipe(
        map((response) => {
          if (response.token) {
            this.setToken(response.token);
          }

          return this.isAuthenticated;
        }),
        take(1)
      );
  }

  getToken() {
    const localToken = window.localStorage.getItem('token');
    if (localToken) {
      this.token = localToken;
      this.isAuthenticated = true;
    }
    return this.token;
  }

  setToken(token: string) {
    this.token = token;
    this.isAuthenticated = true;
    window.localStorage.setItem('token', token);
  }

  logout() {
    this.token = '';
    this.isAuthenticated = false;
    window.localStorage.removeItem('token');
  }
}
