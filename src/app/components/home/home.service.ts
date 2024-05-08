import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, map, take, tap } from 'rxjs';
import { ApiConfigService } from 'src/app/apiConfigService';
import { Movie, MovieResponse, SingleMovieResponse } from 'src/app/interface';

@Injectable()
export class HomeService {
  movieSubject: BehaviorSubject<Movie[]> = new BehaviorSubject<Movie[]>([]);
  movies$: Observable<Movie[]> = this.movieSubject.asObservable();
  private baseUrl: string;

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
    private readonly apiConfigService: ApiConfigService
  ) {
    this.baseUrl = this.apiConfigService.apiUrl;
  }

  getHomeData$(page: number, size: number): void {
    this.http
      .get<MovieResponse>(`${this.baseUrl}/api/v1/movies/all`, {
        params: {
          page,
          size,
        },
      })
      .pipe(
        catchError((err) => {
          console.log(err.status);
          if (err.status === 403) {
            this.router.navigate(['/login']);
          }
          return [];
        }),
        map((response) => {
          const movieWithPoster = response.content.filter(
            (movie) => movie.poster
          );
          this.movieSubject.next([
            ...this.movieSubject.value,
            ...movieWithPoster,
          ]);
        }),
        take(1)
      )
      .subscribe();
  }

  getMovie$(id: string): Observable<SingleMovieResponse> {
    return this.http
      .get<Movie>(`${this.baseUrl}/api/v1/movies/${id}`, {
        withCredentials: true,
      })
      .pipe(
        tap(console.log),
        catchError((err) => {
          console.log(err.status);
          if (err.status === 403) {
            this.router.navigate(['/login']);
          }
          return [];
        })
      );
  }
}
