import { Component, OnInit } from '@angular/core';
// import { GoogleAuthService } from '../googleAuth/google-auth.service';

@Component({
  selector: 'app-jumbotron',
  templateUrl: './jumbotron.component.html',
  styleUrls: ['./jumbotron.component.scss'],
  // providers: [GoogleAuthService]
})
export class JumbotronComponent implements OnInit {
  authurl: string;
  
  constructor(
    // private googleAuth = GoogleAuthService
  ) {}
  
  ngOnInit() {
    // this.authurl = this.googleAuth.getAuth();
  }

  showAuth() {
    // return this.googleAuth.getAuth();
  }

}
