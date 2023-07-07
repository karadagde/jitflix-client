import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import videojs from 'video.js';

@Component({
  selector: 'app-vjs-player',
  templateUrl: './video.component.html',
})
export class VjsPlayerComponent implements AfterViewInit, OnInit {
  @ViewChild('videoPlayer', { static: true }) videoPlayerRef!: ElementRef;
  movieId: string | null = null;
  // need to create constructor and ngOnit so we can read the path parameter from the URL
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.movieId = this.route.snapshot.paramMap.get('movie');
    console.log(this.movieId);
  }

  ngAfterViewInit(): void {
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
