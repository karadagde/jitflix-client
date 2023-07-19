import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { StreamingService } from '../live-streaming-service.service';

@Component({
  selector: 'app-receive-stream',
  templateUrl: './receive-stream.component.html',
  styleUrls: ['./receive-stream.component.css'],
  providers: [StreamingService],
})
export class ReceiveStreamComponent implements OnInit, OnDestroy {
  @ViewChild('liveVideoReceiver', { static: true })
  liveVideoReceiver!: ElementRef;

  constructor(readonly service: StreamingService) {}

  ngOnInit(): void {
    this.service.connectToWebSocketServer();
    this.service.handleIncomingTracks(this.liveVideoReceiver.nativeElement);
  }
  ngOnDestroy(): void {
    this.service.disconnect();
  }
}
