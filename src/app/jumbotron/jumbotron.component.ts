import { Component, OnInit } from '@angular/core';
import { GoogleAuthService } from '../googleAuth/google-auth.service';
import { MessageChannelService } from '../message/message-channel.service';

@Component({
  selector: 'app-jumbotron',
  templateUrl: './jumbotron.component.html',
  styleUrls: ['./jumbotron.component.scss'],
})
export class JumbotronComponent implements OnInit {
  constructor(private googleAuth: GoogleAuthService,
              private messageService: MessageChannelService) {}
  
  ngOnInit() { }

  startAuth() {
    this.messageService.add('hello');
  }

}
