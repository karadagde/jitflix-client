import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, take } from 'rxjs';
import { ApiConfigService } from 'src/app/apiConfigService';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable()
export class VideoService {
  private baseUrl: string;

  constructor(
    private readonly http: HttpClient,
    private readonly authService: AuthService,
    private readonly apiConfigService: ApiConfigService
  ) {
    this.baseUrl = this.apiConfigService.apiUrl;
  }

  updateViewingHistory(movieId: string, currentTime: number) {
    this.http
      .post(
        `${this.baseUrl}/api/v1/watch/history`,
        {
          lastStoppedMinute: currentTime,
          movieId: movieId,
          appUser: {
            email: this.authService.getUserId(),
          },
        },
        {
          withCredentials: true,
        }
      )
      .pipe(take(1))
      .subscribe();
  }

  getViewingHistory(movieId: string) {
    const userId = this.authService.getUserId();
    if (!userId) {
      return of(false);
    }
    return this.http
      .get(
        `${
          this.baseUrl
        }/api/v1/watch/history/${movieId}/${this.authService.getUserId()}`
      )
      .pipe(take(1));
  }
}
