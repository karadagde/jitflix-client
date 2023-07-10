import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';

import videojs from 'video.js';

@Component({
  selector: 'app-vjs-player',
  templateUrl: './video.component.html',
})
export class VjsPlayerComponent implements AfterViewInit {
  @ViewChild('videoPlayer', { static: true }) videoPlayerRef!: ElementRef;
  @Input() movieId!: string;

  constructor() {}

  ngAfterViewInit(): void {
    this.movieId = 'reloaded';
    const videoPlayer = videojs(this.videoPlayerRef.nativeElement, {
      autoplay: true,
      controls: true,
      controlBar: {
        volumePanel: {
          inline: false,
        },
        skipButtons: {
          forward: 10,
          backward: 10,
        },
      },
      muted: true,
      // fluid: true,
      aspectRatio: '16:9',
      playbackRates: [0.5, 1, 1.5, 2],
      VideoPlaybackQuality: {
        bandwidth: 800000,
      },
      sources: [
        {
          src:
            'http://localhost:8080/movies/watch/' +
            this.movieId +
            '/playlist/local',
          type: 'application/x-mpegURL',
          withCredentials: true,
        },
      ],
    });

    videoPlayer.play();
  }
}
