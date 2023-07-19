import { Injectable } from '@angular/core';
import { BehaviorSubject, scan } from 'rxjs';

@Injectable()
export class StreamingService {
  private configuration = {
    iceServers: [
      {
        urls: 'stun:stun.l.google.com:19302',
      },
    ],
  };
  private peerConnection: RTCPeerConnection = new RTCPeerConnection(
    this.configuration
  );
  private webSocket!: WebSocket;

  private messageSubject$ = new BehaviorSubject<any>([]);
  private readonly socketAddress: string = 'ws://localhost:8080/socket';
  message$ = this.messageSubject$
    .asObservable()
    .pipe(scan((acc, val) => acc.concat(val)));

  constructor() {}

  connectToWebSocketServer() {
    this.webSocket = new WebSocket(this.socketAddress);
    this.webSocket.onmessage = (message) => {
      this.handleWebSocketMessage(message);
    };
    this.peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        this.webSocket.send(JSON.stringify({ candidate: event.candidate }));
      }
    };
  }

  handleWebSocketMessage(message: any) {
    const parsedData = JSON.parse(message.data);

    if (parsedData.sdp) {
      this.peerConnection.setRemoteDescription(
        new RTCSessionDescription(parsedData.sdp)
      );
      if (parsedData.sdp.type === 'offer') {
        this.peerConnection
          .createAnswer()
          .then((answer) => this.setAndSendDescription(answer));
      }
    } else if (parsedData.candidate) {
      this.peerConnection.addIceCandidate(
        new RTCIceCandidate(parsedData.candidate)
      );
    } else if (parsedData.message) {
      this.messageSubject$.next([parsedData.message]);
    }
  }

  setAndSendDescription(description: any) {
    this.peerConnection.setLocalDescription(description);
    this.webSocket.send(JSON.stringify({ sdp: description }));
  }

  getLocalStream(stream: MediaStream) {
    stream.getTracks().forEach((track) => {
      this.peerConnection.addTrack(track, stream);
    });

    this.peerConnection
      .createOffer()
      .then((offer) => this.setAndSendDescription(offer));
  }

  handleIncomingTracks(remoteVideoElement: HTMLVideoElement) {
    this.peerConnection.ontrack = (event) => {
      if (remoteVideoElement.srcObject !== event.streams[0]) {
        remoteVideoElement.srcObject = event.streams[0];
      }
    };
  }

  sendMessage(text: string) {
    this.webSocket.send(JSON.stringify({ message: text }));
  }

  disconnect() {
    this.webSocket.close();
    this.peerConnection.close();
  }
}
