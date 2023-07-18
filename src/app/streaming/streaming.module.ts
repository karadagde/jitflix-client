import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StreamingComponent } from './streaming.component';
import { VjsPlayerComponent } from './video.component';
import { MatCardModule } from '@angular/material/card';
import { LiveStreamingComponent } from './live-streaming/live-streaming.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { ReceiveStreamComponent } from './live-streaming/receive-stream/receive-stream.component';

@NgModule({
  declarations: [
    VjsPlayerComponent,
    StreamingComponent,
    LiveStreamingComponent,
    ReceiveStreamComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'live', component: LiveStreamingComponent },
      { path: 'receive', component: ReceiveStreamComponent },
      { path: ':movie', component: StreamingComponent },
    ]),
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
  ],
})
export class StreamingModule {}
