import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';

import 'video.js';

import { BehaviorSubject, map, take } from 'rxjs';
import { ApiConfigService } from 'src/app/apiConfigService';
import { Player } from 'video.js';
import createQualitySettingsButton, {
  setSelectedQuality,
} from './quality-selector';
import { VideoService } from './video.service';
import { vjsOptions } from './videojs-options';

declare module 'video.js' {
  interface Player {
    qualityLevels: () => any;
    dispose: () => any;
    currentTime: (time?: number) => any;
    paused: () => boolean;
    on: (event: string, callback: () => void) => any;
  }
}

declare const videojs: any;
@Component({
  selector: 'app-vjs-player',
  templateUrl: './video.component.html',
  providers: [VideoService],
})
export class VjsPlayerComponent implements AfterViewInit, OnDestroy, OnInit {
  @Input() movieId!: string;

  private player!: Player;
  private lastStoppedMinute: number = 0;
  private interval: any;
  private lastStoppedMinuteUpdated = new BehaviorSubject<boolean>(false);
  private baseUrl: string;
  constructor(
    private readonly service: VideoService,
    private readonly apiConfigService: ApiConfigService
  ) {
    this.baseUrl = this.apiConfigService.apiUrl;
  }

  ngOnInit(): void {
    this.movieId = '573a139bf29313caabcf3d23'; // hardcoded for testing
    this.service
      .getViewingHistory(this.movieId)
      .pipe(
        map((response: any) => {
          if (response) {
            this.lastStoppedMinute = response.lastStoppedMinute;
            this.lastStoppedMinuteUpdated.next(true);
          } else {
            this.lastStoppedMinuteUpdated.next(true);
          }
        }),
        take(1)
      )
      .subscribe();
  }

  ngAfterViewInit(): void {
    this.lastStoppedMinuteUpdated.subscribe((updated) => {
      if (updated) {
        this.initializePlayer();
      }
    });
  }

  initializePlayer(): void {
    // this.movieId = 'reloaded';
    this.movieId = '573a139bf29313caabcf3d23'; // hardcoded for testing
    vjsOptions.sources[0].src = `${this.baseUrl}/api/v1/movies/watch/${this.movieId}/playlist`;
    // 'https://jitflix.azurewebsites.net/api/v1/movies/watch/' +
    // 'http://localhost:8080/api/v1/movies/watch/' +
    // this.movieId +
    // '/playlist/master.m3u8';
    this.player = videojs('videoPlayer', vjsOptions);

    this.player.currentTime(this.lastStoppedMinute);

    let qualityLevels = this.player.qualityLevels();
    this.player.qualityLevels().on('addqualitylevel', (event: any) => {
      event.qualityLevel.enabled = true;
      createQualitySettingsButton(event.qualityLevel.height, qualityLevels);
    });

    this.player.qualityLevels().on('change', () => {
      setSelectedQuality(qualityLevels[qualityLevels.selectedIndex].height);
    });

    this.player.on('pause', () => {
      this.stopInterval();
    });
    this.player.on('play', () => {
      this.startInterval();
    });
  }

  ngOnDestroy() {
    if (this.player) {
      clearInterval(this.interval);
      this.interval = null;
      this.player.dispose();
    }
    this.lastStoppedMinuteUpdated.unsubscribe();
  }

  startInterval() {
    if (this.interval) {
      this.stopInterval();
    }
    this.interval = setInterval(() => {
      this.service.updateViewingHistory(
        this.movieId,
        this.player.currentTime()
      );
    }, 3000);
  }

  stopInterval() {
    clearInterval(this.interval);
    this.interval = null;
  }
}
