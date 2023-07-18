import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LiveStreamingService } from '../live-streaming-service.service';

@Component({
  selector: 'app-receive-stream',
  templateUrl: './receive-stream.component.html',
  styleUrls: ['./receive-stream.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [LiveStreamingService],
})
export class ReceiveStreamComponent {
  message: any;
  constructor(private liveStreamingService: LiveStreamingService) {
    this.liveStreamingService.conn.onmessage = (event) => {
      this.message = JSON.parse(event.data);
      console.log(this.message);
      if (this.message.sdp) {
        this.liveStreamingService.receiveOffer(this.message);
      } else if (this.message.ice) {
        this.liveStreamingService.receiveICECandidate(this.message);
      }
    };
  }
}
