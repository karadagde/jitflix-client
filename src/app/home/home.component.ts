import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { HomeService, Movie } from './home.service';
import {
  Observable,
  debounceTime,
  filter,
  map,
  of,
  pairwise,
  switchMap,
  take,
  tap,
  throttleTime,
} from 'rxjs';
import { CdkScrollable, ScrollDispatcher } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  @ViewChild(CdkScrollable) scrollable!: CdkScrollable;

  movies$: Observable<Movie[]> = this.homeService.movieSubject;
  constructor(
    private readonly homeService: HomeService,
    private scrollDispatcher: ScrollDispatcher
  ) {}
  page: number = 0;
  size: number = 20;

  // ngOnInit(): void {
  //   this.homeService.getHomeData$(this.page, this.size);
  // }

  // ngOnInit(): void {
  //   this.homeService.getHomeData$(this.page, this.size);

  //   this.scrollDispatcher
  //     .scrolled()
  //     .pipe(
  //       debounceTime(150),
  //       filter((event) => !!event),
  //       map((event) => event as CdkScrollable),
  //       pairwise(),
  //       filter(([prev, curr]) => curr.measureScrollOffset('bottom') < 200)
  //     )
  //     .subscribe((_) => this.nextPage());
  // }

  ngOnInit(): void {
    this.homeService.getHomeData$(this.page, this.size);

    this.scrollDispatcher
      .scrolled()
      .pipe(
        throttleTime(200),
        tap((_) => console.log('scrolling')),
        map(() => this.scrollable.measureScrollOffset('bottom')),
        tap((y) => console.log(y)),
        pairwise(),
        tap(([prev, curr]) => console.log(prev, curr)),
        filter(([y1, y2]) => y2 < y1 && y2 < 140)
      )
      .subscribe(([prev, curr]) => {
        this.nextPage();
      });
  }

  nextPage() {
    this.page++;
    this.homeService.getHomeData$(this.page, this.size);
  }
}
