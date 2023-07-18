import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LiveStreamingService } from '../live-streaming-service.service';
import { BehaviorSubject, scan } from 'rxjs';

@Component({
  selector: 'app-receive-stream',
  templateUrl: './receive-stream.component.html',
  styleUrls: ['./receive-stream.component.css'],
  providers: [LiveStreamingService],
})
export class ReceiveStreamComponent implements OnInit {
  @ViewChild('liveVideoReceiver', { static: true })
  liveVideoReceiver!: ElementRef;

  private messageSubject$ = new BehaviorSubject<any>([]);
  message$ = this.messageSubject$
    .asObservable()
    .pipe(scan((acc, val) => acc.concat(val)));

  constructor(private liveStreamingService: LiveStreamingService) {
    this.liveStreamingService.conn.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.messageSubject$.next([data]);

      if (data.sdp) {
        this.liveStreamingService.receiveOffer(data);
      } else if (data.ice) {
        this.liveStreamingService.receiveICECandidate(data);
      }
    };
  }

  ngOnInit(): void {
    this.liveStreamingService.peerConnection.ontrack = (event) => {
      console.log(event);
      const video = this.liveVideoReceiver.nativeElement;

      if (video) {
        video.srcObject = event.streams[0];
      }
    };
    console.log(this.liveStreamingService.peerConnection.ontrack);
    this.liveVideoReceiver.nativeElement.startVideo = this.startVideo();
  }

  startVideo() {
    this.liveStreamingService.peerConnection.ontrack = (event) => {
      console.log(event);
      const video = this.liveVideoReceiver.nativeElement;

      if (video) {
        video.srcObject = event.streams[0];
      }
    };
    console.log(this.liveStreamingService.peerConnection.ontrack);
  }
}
