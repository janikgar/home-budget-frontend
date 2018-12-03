import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageChannelService } from '../message/message-channel.service';

@Component({
  selector: 'app-auth-finish',
  templateUrl: './auth-finish.component.html',
  styleUrls: ['./auth-finish.component.scss']
})
export class AuthFinishComponent implements OnInit {
  params: Object;

  constructor(private route: ActivatedRoute,
              private messageService: MessageChannelService) { }

  ngOnInit() {
   const params = this.route.snapshot.queryParamMap;
    if (params.has('code')) {
      this.messageService.add(params.get('code'));
    } else if (params.has('error')) {
      this.messageService.add(params.get('error'))
    }
  }
}
