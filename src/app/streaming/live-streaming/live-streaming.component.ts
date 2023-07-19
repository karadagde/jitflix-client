import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, skip, takeUntil } from 'rxjs';
import { StreamingService } from './live-streaming-service.service';

@Component({
  selector: 'app-live-streaming',
  templateUrl: './live-streaming.component.html',
  styleUrls: ['./live-streaming.component.css'],
  providers: [StreamingService],
})
export class LiveStreamingComponent implements OnInit, OnDestroy {
  @ViewChild('liveVideo', { static: true }) liveVideo!: ElementRef;

  destroy$: Subject<boolean> = new Subject<boolean>();

  videoDevices: MediaDeviceInfo[] = [];
  audioDevices: MediaDeviceInfo[] = [];

  form: FormGroup = new FormGroup({
    videoOptions: new FormControl('', Validators.required),
    audioOptions: new FormControl('', Validators.required),
  });

  freeText = new FormControl('');

  constructor(private service: StreamingService) {
    // this.liveStreamingService.conn.onmessage = (event) => {
    //   const data = JSON.parse(event.data);
    //   console.log('received data 2', data);
    //   if (data.event === 'candidate') {
    //     console.log('do I have candidate 2');
    //     this.liveStreamingService.receiveICECandidate(data.data);
    //   } else if (data.event === 'answer') {
    //     console.log('do I have ice 2');
    //     this.liveStreamingService.handleAnswer(data.data);
    //   }
    // };
  }

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
    const video = this.liveVideo.nativeElement;
    video.srcObject = stream;
  }
  private async getAndDisplayLocalStream() {
    const devices = await navigator.mediaDevices.enumerateDevices();
    console.log(devices);
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
    this.service.connectToWebSocketServer();
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
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
    this.service.disconnect();
  }
  sendMessage() {
    const message = this.getText();
    console.log(message);
    if (message) {
      this.service.sendMessage(message);
      this.freeText.patchValue('');
      this.freeText.markAsPristine();
    }
  }
}
