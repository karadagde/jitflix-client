import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomeService } from '../home/home.service';
import { Observable } from 'rxjs';
import { Movie } from '../interface';

@Component({
  selector: 'app-streaming',
  templateUrl: './streaming.component.html',
  styleUrls: ['./streaming.component.css'],
})
export class StreamingComponent implements OnInit {
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
