import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';

import 'video.js';

import { Player } from 'video.js';
import createQualitySettingsButton, {
  setSelectedQuality,
} from './quality-selector';
import { vjsOptions } from './videojs-options';

declare module 'video.js' {
  interface Player {
    qualityLevels: () => any;
    dispose: () => any;
  }
}

declare const videojs: any;
@Component({
  selector: 'app-vjs-player',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
  encapsulation: ViewEncapsulation.None,
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VjsPlayerComponent implements AfterViewInit, OnDestroy {
  @Input() movieId!: string;

  private player!: Player;

  constructor() {}

  ngAfterViewInit(): void {
    this.movieId = 'reloaded';
    vjsOptions.sources[0].src =
      'http://localhost:8080/api/v1/movies/watch/' +
      this.movieId +
      '/playlist/master.m3u8';
    this.player = videojs('videoPlayer', vjsOptions);

    let qualityLevels = this.player.qualityLevels();
    this.player.qualityLevels().on('addqualitylevel', (event: any) => {
      event.qualityLevel.enabled = true;
      createQualitySettingsButton(event.qualityLevel.height, qualityLevels);
    });

    this.player.qualityLevels().on('change', () => {
      setSelectedQuality(qualityLevels[qualityLevels.selectedIndex].height);
    });
  }

  ngOnDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  }
}
