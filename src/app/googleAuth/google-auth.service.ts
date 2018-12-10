import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { MessageChannelService } from '../message/message-channel.service';
import * as data from '../oauth2.json';
import { TillerDbService } from '../tillerDb/tiller-db.service';

@Injectable({
  providedIn: 'root',
})
export class GoogleAuthService {
  constructor(private http: HttpClient,
              private messageService: MessageChannelService,
              private location: Location,
              private tillerDb: TillerDbService) {
              }
  existingAuth = false;
  configDb = this.tillerDb.config_db;
  
  ngOnInit() {
    this.existingAuth = true;
    let req = this.configDb.getItem('authCode');
    req.then( value => {
      this.messageService.add('Authentication successful');
      this.tokenParams['code'] = value.toString();
    }).catch( err => {
      console.log(err);
      this.messageService.add(err);
    });
  }
  
  authEndpoint = 'https://accounts.google.com/o/oauth2/v2/auth';
  tokenEndpoint = 'https://www.googleapis.com/oauth2/v4/token';

  params = {
    'scope': 'https://www.googleapis.com/auth/spreadsheets.readonly',
    'access_type': 'offline',
    'include_granted_scopes': 'true',
    'state': 'state_parameter_passthrough_value',
    'redirect_uri': 'http://localhost:4200/authFinish',
    'response_type': 'code',
    'client_id': data.web.client_id,
  }

  tokenParams = {
    'code': '',
    'client_id': data.web.client_id,
    'client_secret': data.web.client_secret,
    'redirect_uri': 'http://localhost:4200/authFinish',
    'grant_type': 'authorization_code'
  }

  makeRequest(params: object, endpoint: string) {
    var form = document.createElement('form');
    form.setAttribute('method', 'POST');
    form.setAttribute('action', endpoint);
    for (let element in params) {
      var input = document.createElement('input');
      input.setAttribute('type', 'hidden');
      input.setAttribute('name', element);
      input.setAttribute('value', params[element]);
      form.appendChild(input);
    }
    document.body.appendChild(form);
    this.messageService.add('Beginning Google Auth...');
    form.submit();
  }

  startAuth() {
    if (this.existingAuth) {
      let params = this.tokenParams;
      let endpoint = this.tokenEndpoint;
      this.makeRequest(params, endpoint);
    } else {
      let params = this.params;
      let endpoint = this.authEndpoint;
      this.makeRequest(params, endpoint);
    }
  }

  getSheet(token: string, sheet_id: string): string {
    this.http.get(
      `https://sheets.googleapis.com/v4/spreadsheets/${sheet_id}/values/Transactions!A1:O`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }
    ).toPromise().then( response => {
      return response;
    }).catch( err => {
      this.messageService.add(err);
    })
    return "";
  }
 
  getAuthToken(code: string) {
    //alert(code);
    this.tokenParams.code = code;
    var foo = this.http.post(
      this.tokenEndpoint,
      this.tokenParams
    )
    foo.subscribe(
      response => {
        for (let property in response) {
          // window.localStorage.setItem(property, response[property]);
          this.configDb.setItem(property, response[property])
            .then( () => {
              this.location.go('table');
            }).catch( err => {
              console.log(err);
              this.messageService.add('err');
            });
        }
      },
      err => {
        console.error(err);
      }
    )
  }
}
