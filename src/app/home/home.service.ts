import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, take } from 'rxjs';

export interface Movie {
  id: string;
  bucketUrl: string;
  poster: string;
  plot: string;
  genres: string[];
  runtime: Number;
  cast: string[];
  num_mflix_comments: number;
  title: string;
  fullplot: string;
  countries: string[];
  released: Date;
  directors: string[];
  writers: string[];
  rated: string;
  lastupdated: string;
  year: number;
  type: string;
}

export interface MovieResponse {
  content: Movie[];
  pageable: {
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };
    offset: number;
    pageSize: number;
    pageNumber: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}
@Injectable()
export class HomeService {
  movieSubject: BehaviorSubject<Movie[]> = new BehaviorSubject<Movie[]>([]);
  movies$: Observable<Movie[]> = this.movieSubject.asObservable();

  constructor(private readonly http: HttpClient) {}

  getHomeData$(page: number, size: number): void {
    console.log('do I get called here?');
    this.http
      .get<MovieResponse>('http://localhost:8080/movies/all', {
        params: {
          page,
          size,
        },
      })
      .pipe(
        map((response) => {
          console.log(response);
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
}
