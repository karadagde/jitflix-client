import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class SignupService {
  constructor(private readonly http: HttpClient) {}

  checkEmail(email: string): Observable<boolean> {
    // return this.http.post<boolean>('http://localhost:8080/api/v1/auth/check-email', { email: email });
    console.log(email, this.http.options);
    const randomCheck = Math.floor(Math.random() * 10) % 2 === 0 ? true : false;

    return of(randomCheck);
  }
}
