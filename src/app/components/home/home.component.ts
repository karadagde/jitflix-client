import { CdkScrollable, ScrollDispatcher } from '@angular/cdk/scrolling';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Observable, debounceTime, filter, map } from 'rxjs';
import { HomeService } from './home.service';

import { Router } from '@angular/router';
import { Movie } from 'src/app/interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  @ViewChild(CdkScrollable) scrollable!: CdkScrollable;

  movies$: Observable<Movie[]> = this.homeService.movieSubject;
  constructor(
    private readonly homeService: HomeService,
    private scrollDispatcher: ScrollDispatcher,
    private cdRef: ChangeDetectorRef,
    private readonly route: Router
  ) {}
  page: number = 0;
  size: number = 20;

  ngOnInit(): void {
    this.homeService.getHomeData$(this.page, this.size);

    this.scrollDispatcher
      .scrolled()
      .pipe(
        debounceTime(150),
        filter((event) => !!event),
        map((event) => event as CdkScrollable),

        filter((scrollable) => scrollable.measureScrollOffset('bottom') < 200)
      )
      .subscribe((_) => {
        this.nextPage();
        this.cdRef.detectChanges();
      });
  }

  nextPage() {
    this.page++;
    this.homeService.getHomeData$(this.page, this.size);
  }

  navigateToMovie(movie: Movie) {
    this.route.navigate(['/watch', movie.id]);
  }
}
