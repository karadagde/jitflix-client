import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { HomeService, Movie } from './home.service';
import { Observable, map, of } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  movies$: Observable<Movie[]> = of([]);
  constructor(private readonly homeService: HomeService) {}

  ngOnInit(): void {
    this.movies$ = this.homeService.getHomeData$().pipe(
      map((movies) => {
        return movies.filter((movie) => movie.poster);
      })
    );
  }
}
