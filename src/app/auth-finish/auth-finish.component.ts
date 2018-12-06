import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageChannelService } from '../message/message-channel.service';
import { GoogleAuthService } from '../googleAuth/google-auth.service';
import { Location } from '@angular/common';

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
              private location: Location,
              ) { }

  ngOnInit() {
    const params = this.route.snapshot.queryParamMap;
    if (params.has('code')) {
      this.googleAuth.tokenParams['code'] = params.get('code');
      this.googleAuth.getAuthToken(params.get('code'));
      this.location.go('dashboard');
    } else if (params.has('error')) {
      this.messageService.add(params.get('error'));
    }
  }
}
