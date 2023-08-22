import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MessageService } from './message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent {
  constructor(readonly messageService: MessageService) {
    this.messageService.configureAndConnect();
    this.messageService.subscribeToMessages();
  }

  message = new FormControl('');

  sendMessage() {
    console.log(this.message.value);
    this.messageService.sendMessages(this.message.value);
    this.message.reset();
  }
}
