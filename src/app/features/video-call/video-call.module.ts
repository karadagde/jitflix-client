import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { VideoCallerComponent } from './caller/caller.component';
import { VideoCallReceiverComponent } from './receiver/receiver.component';
// import { VideoCallService } from './service/video-call.service';

@NgModule({
  declarations: [VideoCallerComponent, VideoCallReceiverComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    RouterModule.forChild([
      { path: 'call', component: VideoCallerComponent },
      { path: 'answer', component: VideoCallReceiverComponent },
    ]),
  ],
  exports: [],
  // providers: [VideoCallService],
})
export class VideoCallModule {}
