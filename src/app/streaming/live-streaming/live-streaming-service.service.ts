import { Injectable } from '@angular/core';

@Injectable()
export class LiveStreamingService {
  conn: WebSocket;
  configuration = undefined;

  peerConnection: RTCPeerConnection;

  dataChannel: RTCDataChannel;
  constructor() {
    this.conn = new WebSocket('ws://localhost:8080/socket');
    this.peerConnection = new RTCPeerConnection(this.configuration);
    this.dataChannel = this.peerConnection.createDataChannel('dataChannel');
  }

  send(message: any) {
    this.conn.send(JSON.stringify(message));
  }

  addListeners() {
    this.dataChannel.onerror = function (error) {
      console.log('Error:', error);
    };
    this.dataChannel.onclose = function () {
      console.log('Data channel is closed');
    };
  }
  createOffer(message: any) {
    this.peerConnection
      .createOffer()
      .then((offer) => {
        return this.peerConnection.setLocalDescription(offer);
      })
      .then(() => {
        this.send(message);
        console.log('creating offer');
      });
  }
  handleIceCandidate(event: any) {
    console.log('icecandidate event: ', event);
    if (event.candidate) {
      this.send({ ice: event.candidate });
    }
  }

  receiveICECandidate(message: any) {
    this.peerConnection
      .addIceCandidate(new RTCIceCandidate(message.ice))
      .catch((e) => console.error(e));
  }

  receiveOffer(message: any) {
    this.peerConnection
      .setRemoteDescription(new RTCSessionDescription(message.sdp))
      .then(() => this.peerConnection.createAnswer())
      .then((answer) => this.peerConnection.setLocalDescription(answer))
      .then(() => this.send({ sdp: this.peerConnection.localDescription }))
      .catch((e) => console.error(e));
  }

  handleAnswer(answer: any) {
    this.peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
  }

  sendChannelMessage(message: any) {
    this.dataChannel.send(message);
  }

  receiveChannelMessage(event: any) {
    console.log('received message:', event.data);
  }

  createDataChannel() {
    this.dataChannel.onopen = () => {
      console.log('data channel is open and ready to be used.');
    };
  }

  createPeerConnection() {
    this.peerConnection.onicecandidate = this.handleIceCandidate.bind(this);
    this.peerConnection.ondatachannel = (event) => {
      this.dataChannel = event.channel;
      this.addListeners();
    };
  }
}
