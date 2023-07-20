import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { Movie } from '../../interface';
import { HomeService } from '../../components/home/home.service';

@Component({
  selector: 'app-streaming',
  templateUrl: './watch-movie.component.html',
  styleUrls: ['./watch-movie.component.css'],
})
export class WatchMovieComponent implements OnInit {
  movieId: string | null = null;
  movie$!: Observable<Movie>;
  constructor(
    private route: ActivatedRoute,
    private readonly service: HomeService
  ) {}

  ngOnInit(): void {
    this.movieId = this.route.snapshot.paramMap.get('movie');
    if (this.movieId) {
      this.movie$ = this.service.getMovie$(this.movieId);
    }
    console.log(this.movieId);
  }
}
