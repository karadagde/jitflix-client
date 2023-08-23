import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, retry, take } from 'rxjs';
import { UserRole } from '../components/enum/user-role.enum';
import { UserSignup } from '../interface';

@Injectable()
export class AuthService {
  private token: string = '';
  public isAuthenticated: boolean = false;
  constructor(private readonly http: HttpClient) {
    this.getAccessToken();
  }

  login(email: string, password: string): Observable<boolean> {
    const authData = { email: email, password: password };
    return this.http
      .post<{
        access_token: string;
        refresh_token: string;
        role: UserRole;
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

  refreshAccessToken(): Observable<boolean> {
    return this.http
      .post('http://localhost:8080/api/v1/auth/refresh-token', {})
      .pipe(
        map((response: any) => {
          if (response.access_token) {
            this.setToken(response);
          }
          return this.isAuthenticated;
        }),
        take(1),
        retry(1)
      );
  }

  getAccessToken() {
    const localToken = window.localStorage.getItem('access_token');
    if (localToken) {
      this.token = localToken;
      this.isAuthenticated = true;
    }
    return this.token;
  }
  getRefreshToken() {
    return window.localStorage.getItem('refresh_token');
  }

  setToken(tokens: {
    access_token: string;
    refresh_token: string;
    role: UserRole;
  }) {
    this.token = tokens.access_token;
    this.isAuthenticated = true;
    const payload: any = parseJwt(tokens.access_token);

    window.localStorage.setItem('user_id', payload.sub);
    window.localStorage.setItem('access_token', tokens.access_token);
    window.localStorage.setItem('refresh_token', tokens.refresh_token);
    window.localStorage.setItem('role', tokens.role);
  }

  logout() {
    this.token = '';
    this.isAuthenticated = false;
    window.localStorage.removeItem('access_token');
    window.localStorage.removeItem('refresh_token');
  }
  signup(user: UserSignup) {
    if (user) {
      return this.http
        .post('http://localhost:8080/api/v1/auth/register', {
          email: user.email,
          password: user.password,
          language: user.language,
          country: user.country,
          role: UserRole.USER,
        })
        .pipe(
          map((response: any) => {
            if (response?.access_token) {
              this.setToken(response);
            }
            return this.isAuthenticated;
          }),
          take(1),
          retry(1)
        );
    } else {
      throw new Error('User is not defined');
    }
  }

  getUserId() {
    return window.localStorage.getItem('user_id');
  }
}

function parseJwt(token: string): any {
  try {
    const base64Url = token.split('.')[1];

    // Replace '-' with '+' and '_' with '/' to make the string Base64 compatible
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');

    const jsonString = atob(base64);

    const decodedPayload = JSON.parse(jsonString);

    return decodedPayload;
  } catch (error) {
    console.error('Error decoding the token:', error);
    return null;
  }
}
