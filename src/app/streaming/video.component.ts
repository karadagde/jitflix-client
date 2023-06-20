import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import videojs from 'video.js';

@Component({
  selector: 'app-vjs-player',
  templateUrl: './video.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class VjsPlayerComponent implements OnInit {
  //   @ViewChild('target', { static: true }) target!: ElementRef;

  //   // See options: https://videojs.com/guides/options
  //   @Input() options!: {
  //     fluid: boolean;
  //     aspectRatio: string;
  //     autoplay: boolean;
  //     sources: {
  //       src: string;
  //       type: string;
  //     }[];
  //   };

  //   player!: Player;

  //   constructor(private elementRef: ElementRef) {}

  //   // Instantiate a Video.js player OnInit
  //   ngOnInit() {
  //     this.player = videojs(
  //       this.target.nativeElement,
  //       this.options,
  //       function onPlayerReady(this: any) {
  //         console.log('onPlayerReady', this);
  //       }
  //     );
  //   }

  //   // Dispose the player OnDestroy
  //   ngOnDestroy() {
  //     if (this.player) {
  //       this.player.dispose();
  //     }
  //   }
  @ViewChild('videoPlayer', { static: true }) videoPlayerRef!: ElementRef;

  ngOnInit(): void {
    // Configure Video.js player
    const videoPlayer = videojs(this.videoPlayerRef.nativeElement);
    videoPlayer.src('http://localhost:8080/videos/{videoId}/playlist.m3u8'); // Replace {videoId} with your actual video ID
    videoPlayer.play();
  }
}
