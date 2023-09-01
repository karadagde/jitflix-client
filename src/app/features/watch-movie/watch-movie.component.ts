import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { HomeService } from '../../components/home/home.service';
import { SingleMovieResponse } from '../../interface';

@Component({
  selector: 'app-streaming',
  templateUrl: './watch-movie.component.html',
  styleUrls: ['./watch-movie.component.scss'],
})
export class WatchMovieComponent implements OnInit {
  movieId: string | null = null;
  movieResponse$!: Observable<SingleMovieResponse>;
  constructor(
    private route: ActivatedRoute,
    private readonly service: HomeService
  ) {}

  ngOnInit(): void {
    this.movieId = this.route.snapshot.paramMap.get('movie');
    if (this.movieId) {
      this.movieResponse$ = this.service.getMovie$(this.movieId);
    }
  }
}
