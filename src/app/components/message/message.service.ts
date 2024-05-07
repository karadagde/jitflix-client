import { Injectable } from '@angular/core';
import { RxStomp } from '@stomp/rx-stomp';
import { BehaviorSubject, scan } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private messageSubject$ = new BehaviorSubject<any>([]);
  message$ = this.messageSubject$
    .asObservable()
    .pipe(scan((acc, val) => acc.concat(val)));

  private rxStomp = new RxStomp();
  readonly socketAddress: string =
    'ws://jitflix.azurewebsites.net/test-endpoint';

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
