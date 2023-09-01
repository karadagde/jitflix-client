import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatCardModule } from '@angular/material/card';

import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { VjsPlayerComponent } from '../../components/videojs-player/video.component';

import { CommentsComponent } from 'src/app/components/comments/comments.component';
import { WatchMovieComponent } from './watch-movie.component';

@NgModule({
  declarations: [VjsPlayerComponent, WatchMovieComponent, CommentsComponent],
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
