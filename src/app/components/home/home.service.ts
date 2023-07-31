import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, take } from 'rxjs';
import { Movie, MovieResponse } from 'src/app/interface';

@Injectable()
export class HomeService {
  movieSubject: BehaviorSubject<Movie[]> = new BehaviorSubject<Movie[]>([]);
  movies$: Observable<Movie[]> = this.movieSubject.asObservable();

  constructor(private readonly http: HttpClient) {}

  getHomeData$(page: number, size: number): void {
    this.http
      .get<MovieResponse>('http://localhost:8080/api/v1/movies/all', {
        params: {
          page,
          size,
        },
      })
      .pipe(
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

  getMovie$(id: string): Observable<Movie> {
    return this.http.get<Movie>('http://localhost:8080/api/v1/movies/' + id);
  }
}
