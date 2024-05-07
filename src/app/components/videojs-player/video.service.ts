import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, take } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable()
export class VideoService {
  constructor(
    private readonly http: HttpClient,
    private readonly authService: AuthService
  ) {}

  updateViewingHistory(movieId: string, currentTime: number) {
    this.http
      .post(
        'http://jitflix.azurewebsites.net/api/v1/watch/history',
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
        'http://jitflix.azurewebsites.net/api/v1/watch/history/' +
          movieId +
          '/' +
          this.authService.getUserId()
      )
      .pipe(take(1));
  }
}
