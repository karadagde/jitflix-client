import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class SignupService {
  constructor(private readonly http: HttpClient) {}

  checkEmail(email: string): Observable<boolean> {
    return this.http.get<boolean>(
      'http://localhost:8080/api/v1/users/user/check/' + email
    );
  }
}
