import {
  // ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, skip, takeUntil } from 'rxjs';
import { LiveStreamingService } from './live-streaming-service.service';

@Component({
  selector: 'app-live-streaming',
  templateUrl: './live-streaming.component.html',
  styleUrls: ['./live-streaming.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [LiveStreamingService],
})
export class LiveStreamingComponent implements OnInit, OnDestroy {
  @ViewChild('liveVideo', { static: true }) liveVideo!: ElementRef;

  destroy$: Subject<boolean> = new Subject<boolean>();

  videoDevices: MediaDeviceInfo[] = [];
  audioDevices: MediaDeviceInfo[] = [];

  constructor(private liveStreamingService: LiveStreamingService) {}

  async getConnectedDevices(type: string): Promise<MediaDeviceInfo[]> {
    const devices = await navigator.mediaDevices.enumerateDevices();
    return devices.filter((device) => device.kind === type);
  }

  form: FormGroup = new FormGroup({
    videoOptions: new FormControl('', Validators.required),
    audioOptions: new FormControl('', Validators.required),
    // freeText: new FormControl(''),
  });

  freeText = new FormControl('');

  selectCamera() {
    return this.form.get('videoOptions')?.value;
  }

  selectMicrophone() {
    return this.form.get('audioOptions')?.value;
  }
  getText() {
    return this.freeText.value;
  }

  async playVideoFromCamera() {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();

      this.videoDevices = devices.filter(
        (device) => device.kind === 'videoinput'
      );
      this.audioDevices = devices.filter(
        (device) => device.kind === 'audioinput'
      );

      const defaultAudio = this.audioDevices.find(
        (device) => device.deviceId === 'default'
      );

      const constraints = {
        audio: {
          echoCancellation: true,
          deviceId: defaultAudio?.deviceId,
        },
        video: {
          deviceId: this.videoDevices[0].deviceId,
        },
      };

      this.form.patchValue({
        videoOptions: this.videoDevices[0].deviceId,
        audioOptions: defaultAudio?.deviceId,
      });

      const stream: MediaStream = await navigator.mediaDevices.getUserMedia(
        constraints
      );
      this.liveVideo.nativeElement.addEventListener(
        'addtrack',
        (event: any) => {
          console.log(event);
        }
      );
      this.liveVideo.nativeElement.addEventListener(
        'removetrack',
        (event: any) => {
          console.log(event);
        }
      );

      console.log(this.liveStreamingService.peerConnection);
      console.log(stream);
      console.log(stream.getTracks());
      stream
        .getTracks()
        .forEach((track) =>
          this.liveStreamingService.peerConnection.addTrack(track, stream)
        );
      // this.liveStreamingService.peerConnection.addTrack(stream);
      this.liveVideo.nativeElement.srcObject = stream;
    } catch (error) {
      console.error('Error opening video camera.', error);
    }
  }

  async setInputDevices(constraints: MediaStreamConstraints) {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    stream.getTracks().forEach((track) => {
      // peerConnection.addTrack(track, localStream);
      console.log(track);
    });
    const video = this.liveVideo.nativeElement;
    video.srcObject = stream;
  }

  ngOnInit(): void {
    this.playVideoFromCamera();
    this.form.valueChanges
      .pipe(skip(1), takeUntil(this.destroy$))
      .subscribe(() => {
        if (this.form.valid) {
          const constraints = {
            video: {
              deviceId: this.selectCamera(),
            },
            audio: {
              deviceId: this.selectMicrophone(),
            },
          };
          this.setInputDevices(constraints);
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
  sendMessage() {
    const message = this.getText();
    if (message) {
      this.liveStreamingService.send(message);
      this.freeText.patchValue('');
      this.freeText.markAsPristine();
    }
  }
}
