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
import { VideoCallService } from './service/video-call.service';
import { VideoCallHomeComponent } from './video-call-home/video-call-home.component';

@NgModule({
  declarations: [
    VideoCallerComponent,
    VideoCallReceiverComponent,
    VideoCallHomeComponent,
  ],
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
      { path: '', component: VideoCallHomeComponent },
      { path: 'join', component: VideoCallReceiverComponent },
      { path: 'start/videomeeting', component: VideoCallerComponent },
    ]),
  ],
  providers: [VideoCallService],
})
export class VideoCallModule {}
