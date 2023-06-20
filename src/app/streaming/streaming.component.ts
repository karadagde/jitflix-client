import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import videojs from 'video.js';
import Player from 'video.js/dist/types/player';

@Component({
  selector: 'app-streaming',
  templateUrl: './streaming.component.html',
  styleUrls: ['./streaming.component.css'],
})
export class StreamingComponent {
  // @ViewChild('target', { static: true })
  // target!: ElementRef;
  // // See options: https://videojs.com/guides/options
  // @Input()
  // options!: {
  //   fluid: boolean;
  //   aspectRatio: string;
  //   autoplay: boolean;
  //   sources: {
  //     src: string;
  //     type: string;
  //   }[];
  // };
  // player!: Player;
  // constructor(private elementRef: ElementRef) {}
  // // Instantiate a Video.js player OnInit
  // ngOnInit() {
  //   this.player = videojs(
  //     this.target.nativeElement,
  //     this.options,
  //     function onPlayerReady() {}
  //   );
  // }
  // // Dispose the player OnDestroy
  // ngOnDestroy() {
  //   if (this.player) {
  //     this.player.dispose();
  //   }
  // }
}
