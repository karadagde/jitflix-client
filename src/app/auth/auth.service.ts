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
      .post<{
        access_token: string;
        refresh_token: string;
      }>('http://localhost:8080/api/v1/auth/authenticate', authData)
      .pipe(
        map((response) => {
          if (response.access_token) {
            this.setToken(response);
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

  setToken(tokens: { access_token: string; refresh_token: string }) {
    this.token = tokens.access_token;
    this.isAuthenticated = true;
    window.localStorage.setItem('access_token', tokens.access_token);
    window.localStorage.setItem('refresh_token', tokens.refresh_token);
  }

  logout() {
    this.token = '';
    this.isAuthenticated = false;
    window.localStorage.removeItem('access_token');
    window.localStorage.removeItem('refresh_token');
  }
}
