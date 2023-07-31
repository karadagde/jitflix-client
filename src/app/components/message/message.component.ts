import { Component } from '@angular/core';
import { MessageService } from './message.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
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
