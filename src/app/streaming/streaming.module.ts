import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { StreamingComponent } from './streaming.component';
import { VjsPlayerComponent } from './video.component';

@NgModule({
  declarations: [VjsPlayerComponent, StreamingComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: ':movie', component: StreamingComponent }]),
  ],
})
export class StreamingModule {}
