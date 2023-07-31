import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatCardModule } from '@angular/material/card';

import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { VjsPlayerComponent } from '../../components/videojs-player/video.component';

import { WatchMovieComponent } from './watch-movie.component';

@NgModule({
  declarations: [VjsPlayerComponent, WatchMovieComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: ':movie', component: WatchMovieComponent }]),
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export class WatchMovieModule {}
