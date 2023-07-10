import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StreamingComponent } from './streaming.component';
import { VjsPlayerComponent } from './video.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [VjsPlayerComponent, StreamingComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: ':movie', component: StreamingComponent }]),
    MatCardModule,
  ],
})
export class StreamingModule {}
