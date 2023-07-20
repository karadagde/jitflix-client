import { Injectable } from '@angular/core';
import { RxStomp } from '@stomp/rx-stomp';
import { BehaviorSubject, scan } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  //   private socket!: WebSocket;
  //   private readonly socketAddress: string = 'ws://localhost:8080/test-endpoint';

  private messageSubject$ = new BehaviorSubject<any>([]);
  message$ = this.messageSubject$
    .asObservable()
    .pipe(scan((acc, val) => acc.concat(val)));

  //   handleMessage(data: any) {
  //     const { channel, message } = data;
  //     switch (channel) {
  //       case 'channel1':
  //         console.log('Message on channel1', message);
  //         this.messageSubject$.next([message]);
  //         break;
  //       case 'channel2':
  //         console.log('Message on channel2', message);

  //         break;
  //       default:
  //         console.log('Unknown channel', message);
  //         break;
  //     }
  //   }

  private rxStomp = new RxStomp();
  readonly socketAddress: string = 'ws://localhost:8080/test-endpoint';

  configureAndConnect() {
    this.rxStomp.configure({
      brokerURL: this.socketAddress,
      reconnectDelay: 200,
      heartbeatIncoming: 0,
      heartbeatOutgoing: 20000,
      debug: (msg: string) => {
        console.log(new Date(), msg);
      },
    });

    this.rxStomp.activate();
  }
  sendMessages(message: any) {
    this.rxStomp.publish({
      destination: '/app/hello',
      body: JSON.stringify({ message }),
    });
  }
  subscribeToMessages() {
    this.rxStomp.watch('/topic/message').subscribe((message) => {
      this.messageSubject$.next([message.body]);
    });
  }
}
