import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, skip, takeUntil } from 'rxjs';
import { VideoCallService } from '../service/video-call.service';

@Component({
  selector: 'app-live-streaming',
  templateUrl: './caller.component.html',
  styleUrls: ['./caller.component.scss'],
  providers: [VideoCallService],
})
export class VideoCallerComponent implements OnInit, OnDestroy {
  @ViewChild('liveVideo', { static: true }) liveVideo!: ElementRef;

  // streams$: MediaStream[] = [];

  destroy$: Subject<boolean> = new Subject<boolean>();

  videoDevices: MediaDeviceInfo[] = [];
  audioDevices: MediaDeviceInfo[] = [];

  form: FormGroup = new FormGroup({
    videoOptions: new FormControl('', Validators.required),
    audioOptions: new FormControl('', Validators.required),
  });

  freeText = new FormControl('');

  constructor(readonly service: VideoCallService) {}

  private selectCamera() {
    return this.form.get('videoOptions')?.value;
  }

  private selectMicrophone() {
    return this.form.get('audioOptions')?.value;
  }
  private getText() {
    return this.freeText.value;
  }

  private async setInputDevices(constraints: MediaStreamConstraints) {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    this.service.changeLocalTrackStream(stream);
    const video = this.liveVideo.nativeElement;
    video.srcObject = stream;
  }
  private async getAndDisplayLocalStream() {
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
    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
      this.liveVideo.nativeElement.srcObject = stream;
      this.service.getLocalStream(stream);
    });
  }
  ngOnInit(): void {
    this.service.connectToWebSocketServer(
      'd8107262-9a55-4a76-8f18-33fb15aaf0de',
      'host'
    );
    this.getAndDisplayLocalStream();
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
    this.service.disconnect();
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
  sendMessage() {
    const message = this.getText();
    if (message) {
      this.service.sendMessage(message);
      this.freeText.patchValue('');
      this.freeText.markAsPristine();
    }
  }
}
