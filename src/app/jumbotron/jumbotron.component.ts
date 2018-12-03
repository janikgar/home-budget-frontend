import { Component, OnInit } from '@angular/core';
import { GoogleAuthService } from '../googleAuth/google-auth.service';
import { MessageChannelService } from '../message/message-channel.service';

@Component({
  selector: 'app-jumbotron',
  templateUrl: './jumbotron.component.html',
  styleUrls: ['./jumbotron.component.scss'],
})
export class JumbotronComponent implements OnInit {
  constructor(private messageService: MessageChannelService,
              private googleAuth: GoogleAuthService) {}
  
  ngOnInit() { }

  startAuth() {
    let params = this.googleAuth.params
    var form = document.createElement('form');
    form.setAttribute('method', 'GET');
    form.setAttribute('action', this.googleAuth.endpoint);
    for (let element in params) {
      var input = document.createElement('input');
      input.setAttribute('type', 'hidden');
      input.setAttribute('name', element);
      input.setAttribute('value', params[element]);
      form.appendChild(input);
    }
    document.body.appendChild(form);
    form.submit();
    this.messageService.add('Beginning Google Auth...');
  }

}
