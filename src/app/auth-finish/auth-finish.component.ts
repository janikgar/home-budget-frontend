import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageChannelService } from '../message/message-channel.service';
import { GoogleAuthService } from '../googleAuth/google-auth.service';

@Component({
  selector: 'app-auth-finish',
  templateUrl: './auth-finish.component.html',
  styleUrls: ['./auth-finish.component.scss']
})
export class AuthFinishComponent implements OnInit {
  params: Object;

  constructor(private route: ActivatedRoute,
              private messageService: MessageChannelService,
              private googleAuth: GoogleAuthService,
              ) { }

  ngOnInit() {
    const params = this.route.snapshot.queryParamMap;
    if (params.has('code')) {
      window.localStorage.setItem('authCode', params.get('code'));
      this.googleAuth.tokenParams['code'] = params.get('code');
      this.googleAuth.makeRequest(this.googleAuth.tokenParams, this.googleAuth.tokenEndpoint);
    } else if (params.has('error')) {
      this.messageService.add(params.get('error'));
    }
  }
}
