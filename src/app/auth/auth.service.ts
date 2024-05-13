import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, retry, take } from 'rxjs';
import { ApiConfigService } from '../apiConfigService';
import { UserRole } from '../components/enum/user-role.enum';
import { UserSignup } from '../interface';

@Injectable()
export class AuthService {
  private token: string = '';
  public xsrfToken: string = '';
  private isAuthenticated: boolean = false;
  private baseUrl: string;

  constructor(
    private readonly http: HttpClient,
    private readonly apiConfigService: ApiConfigService
  ) {
    this.getAccessToken();
    this.baseUrl = this.apiConfigService.apiUrl;
  }

  login(email: string, password: string): Observable<boolean> {
    const authData = { email: email, password: password };
    return this.http
      .post<{
        access_token: string;
        role: UserRole;
      }>(`${this.baseUrl}/api/v1/auth/authenticate`, authData, {
        withCredentials: true,
      })
      .pipe(
        map((response) => {
          if (response.access_token) {
            this.setToken(response);
          }
          return this.isAuthenticatedUser();
        }),
        take(1)
      );
  }

  refreshAccessToken(): Observable<boolean> {
    console.log('refreshing token');
    return this.http
      .post(
        `${this.baseUrl}/api/v1/auth/refresh-token`,
        {},
        {
          withCredentials: true,
        }
      )
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

  setToken(tokens: { access_token: string; role: UserRole }) {
    this.token = tokens.access_token;
    const payload: any = parseJwt(tokens.access_token);

    window.localStorage.setItem('user_id', payload.sub);
    window.localStorage.setItem('access_token', tokens.access_token);
    window.localStorage.setItem('role', tokens.role);
    this.isAuthenticated = true;
  }

  logout(): Observable<boolean> {
    return this.http.post(`${this.baseUrl}/api/v1/logout`, {}).pipe(
      map((response: any) => {
        console.log('logout response ' + response);
        if (response) {
          this.token = '';
          this.xsrfToken = '';
          this.resetAuthentication();
          window.localStorage.removeItem('access_token');
          window.localStorage.removeItem('user_id');
          window.localStorage.removeItem('role');
          return true;
        }
        return false;
      }),
      take(1)
    );
  }
  signup(user: UserSignup) {
    if (user) {
      return this.http
        .post(`${this.baseUrl}/api/v1/auth/register`, {
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

  public isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }

  public resetAuthentication(): void {
    this.isAuthenticated = false;
  }

  getUserId() {
    return window.localStorage.getItem('user_id');
  }

  // getInitialXsrfToken() {
  //   return this.http
  //     .get('https://jitflix.azurewebsites.net/api/v1/auth/initial')
  //     .pipe(
  //       // return this.http.get('http://localhost:8080/api/v1/auth/initial').pipe(
  //       map((response: any) => {
  //         console.log(response);
  //         console.log('making the initial call');
  //         if (response) {
  //           this.xsrfToken = response.token;
  //         }
  //         // return this.xsrfToken;
  //       }),
  //       take(1)
  //     );
  // }
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
