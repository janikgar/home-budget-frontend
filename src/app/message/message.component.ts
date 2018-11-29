import { Component, OnInit } from '@angular/core';
import { MessageChannelService } from './message-channel.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  constructor(private messageChannel: MessageChannelService) { }

  ngOnInit() {
  }

}
