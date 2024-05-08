import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiConfigService } from '../apiConfigService';

@Injectable()
export class SignupService {
  private baseUrl: string;
  constructor(
    private readonly http: HttpClient,
    private readonly apiConfigService: ApiConfigService
  ) {
    this.baseUrl = this.apiConfigService.apiUrl;
  }

  checkEmail(email: string): Observable<boolean> {
    return this.http.get<boolean>(
      `${this.baseUrl}/api/v1/users/user/check/${email}`
    );
  }
}
