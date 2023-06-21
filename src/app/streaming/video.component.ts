import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import videojs from 'video.js';

@Component({
  selector: 'app-vjs-player',
  templateUrl: './video.component.html',
})
export class VjsPlayerComponent implements AfterViewInit {
  @ViewChild('videoPlayer', { static: true }) videoPlayerRef!: ElementRef;

  ngAfterViewInit(): void {
    const videoPlayer = videojs(this.videoPlayerRef.nativeElement, {
      autoplay: true,
      controls: true,
      fluid: true,
      aspectRatio: '16:9',
      playbackRates: [0.5, 1, 1.5, 2],
    });

    videoPlayer.src([
      {
        src: 'http://localhost:8080/videos/reloaded/output.mp4',
        type: 'video/mp4',
      },
      {
        src: 'http://localhost:8080/videos/reloaded/output_720p.m3u8',
        type: 'application/x-mpegURL',
        label: '720p',
      },
      {
        src: 'http://localhost:8080/videos/reloaded/output_480p.m3u8',
        type: 'application/x-mpegURL',
        label: '480p',
      },
      {
        src: 'http://localhost:8080/videos/reloaded/output_360p.m3u8',
        type: 'application/x-mpegURL',
        label: '360p',
      },
    ]);

    videoPlayer.play();
  }
}
