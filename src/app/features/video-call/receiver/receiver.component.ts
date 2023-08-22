import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { VideoCallService } from '../service/video-call.service';

@Component({
  selector: 'app-receive-stream',
  templateUrl: './receiver.component.html',
  styleUrls: ['./receiver.component.scss'],
  providers: [VideoCallService],
})
export class VideoCallReceiverComponent implements OnInit, OnDestroy {
  @ViewChild('liveVideoReceiver', { static: true })
  liveVideoReceiver!: ElementRef;

  constructor(readonly service: VideoCallService) {}

  ngOnInit(): void {
    this.service.connectToWebSocketServer();

    this.service.handleIncomingTracks(this.liveVideoReceiver.nativeElement);
  }
  ngOnDestroy(): void {
    this.service.disconnect();
  }
}
