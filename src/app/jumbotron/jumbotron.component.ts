import { Component, OnInit } from '@angular/core';
import { GoogleAuthService } from '../googleAuth/google-auth.service';
import { MessageChannelService } from '../message/message-channel.service';
import { GoogleAuthComponent } from '../googleAuth/google-auth.component';

@Component({
  selector: 'app-jumbotron',
  templateUrl: './jumbotron.component.html',
  styleUrls: ['./jumbotron.component.scss'],
  providers: [GoogleAuthComponent]
})
export class JumbotronComponent implements OnInit {
  constructor(private googleAuth: GoogleAuthService,
              private messageService: MessageChannelService,
              private googleAuthModal: GoogleAuthComponent) {}
  
  ngOnInit() { }

  startAuth() {
    this.googleAuth.getAuth().subscribe(
      x => {
        this.googleAuthModal.open(x)
      }
    );
  }

}
