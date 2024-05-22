import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, scan, switchMap } from 'rxjs';
import { ApiConfigService } from 'src/app/apiConfigService';

@Injectable()
export class VideoCallService {
  streams$: Observable<MediaStream[]> = of([]);
  private baseUrl: string = this.apiConfigService.ws;
  private configuration = {
    iceServers: [
      {
        urls: 'stun:stun.l.google.com:19302',
      },
    ],
  };
  constructor(private readonly apiConfigService: ApiConfigService) {}
  private peerConnection: RTCPeerConnection = new RTCPeerConnection(
    this.configuration
  );
  private webSocket!: WebSocket;
  private messageSubject$ = new BehaviorSubject<any>([]);
  private readonly socketAddress: string = `${this.baseUrl}/video-call`;

  message$ = this.messageSubject$
    .asObservable()
    .pipe(scan((acc, val) => acc.concat(val)));

  connectToWebSocketServer(roomId: string, callerType: string) {
    this.webSocket = new WebSocket(this.socketAddress + '/' + roomId);

    this.webSocket.onmessage = (message) => {
      this.handleWebSocketMessage(message, callerType);
    };

    this.peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        this.webSocket.send(JSON.stringify({ candidate: event.candidate }));
      }
    };
    this.webSocket.onopen = () => {
      console.log('WebSocket connection opened');
      this.createAnswer(callerType);
    };
  }

  handleWebSocketMessage(message: any, callerType: string): void {
    const parsedData = JSON?.parse(message.data);

    console.log('parsedData', parsedData);
    if (parsedData?.sdp) {
      this.peerConnection.setRemoteDescription(
        new RTCSessionDescription(parsedData.sdp)
      );
      if (parsedData.sdp?.type === 'offer' && callerType === 'participant') {
        this.peerConnection
          .createAnswer()
          .then((answer) => this.setAndSendDescription(answer));
      }
    } else if (parsedData?.candidate) {
      this.peerConnection.addIceCandidate(
        new RTCIceCandidate(parsedData.candidate)
      );
    } else if (parsedData?.message) {
      this.messageSubject$.next([parsedData.message]);
    }
  }

  setAndSendDescription(description: RTCSessionDescriptionInit) {
    this.peerConnection.setLocalDescription(description);
    this.webSocket.send(JSON.stringify({ sdp: description }));
  }

  getLocalStream(stream: MediaStream) {
    stream.getTracks().forEach((track) => {
      this.peerConnection.addTrack(track, stream);
    });

    this.peerConnection.createOffer().then((offer) => {
      this.setAndSendDescription(offer);
    });
  }

  handleIncomingTracks(remoteVideoElement: HTMLVideoElement) {
    console.log('handleIncomingTracks');
    this.peerConnection.ontrack = (event) => {
      if (remoteVideoElement.srcObject !== event.streams[0]) {
        remoteVideoElement.srcObject = event.streams[0];
      }
      this.streams$.pipe(
        switchMap((streams) => of([...streams, event.streams[0]]))
      );
    };
  }

  createAnswer(callerType: string) {
    console.log('createAnswer');
    if (this.webSocket.readyState === 1 && callerType === 'host') {
      this.peerConnection
        .createOffer()
        .then((offer) => this.setAndSendDescription(offer));
    }
  }

  changeLocalTrackStream(stream: MediaStream) {
    console.log('changeLocalTrackStream');
    console.log(stream);
    const senders = this.peerConnection.getSenders();
    const tracks: MediaStreamTrack[] = stream.getTracks();

    senders.forEach((sender) => {
      if (sender && tracks.length > 0) {
        const match = tracks.find((t) => t?.kind === sender?.track?.kind);
        sender.replaceTrack(match!);
      }
    });
  }

  sendMessage(text: string) {
    this.webSocket.send(JSON.stringify({ message: text }));
  }

  disconnect() {
    this.webSocket.close(1001);
    this.peerConnection.close();
  }
}
