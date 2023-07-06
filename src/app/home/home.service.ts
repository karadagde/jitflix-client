import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

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
  constructor(private readonly http: HttpClient) {}

  getHomeData$(): Observable<Movie[]> {
    return this.http
      .get<MovieResponse>('http://localhost:8080/movies/all')
      .pipe(map((response) => response.content));
  }
}
