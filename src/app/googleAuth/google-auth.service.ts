import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { MessageChannelService } from '../message/message-channel.service';
import * as data from '../oauth2.json';

@Injectable({
  providedIn: 'root',
})
export class GoogleAuthService {
  constructor(private http: HttpClient,
              private messageService: MessageChannelService) {
              }
  existingAuth = false;
  
  ngOnInit() {
    if (window.localStorage.getItem('authCode')) {
      this.existingAuth = true;
      this.tokenParams['code'] = window.localStorage.getItem('authCode');
    }            
  }
  
  private log(message: string) {
    console.log(message);
    this.messageService.add(`${message}`)
  }

  private handleError<T> (operation='operation', result?: T) {
    return(error: any): Observable<T> => {
      console.error(error)
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
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
    'client_id': data.installed.client_id,
  }

  tokenParams = {
    'code': '',
    'client_id': data.installed.client_id,
    'client_secret': data.installed.client_secret,
    'redirect_uri': 'http://localhost:4200/dashboard',
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
      document.body.appendChild(form);
      form.submit();
      this.messageService.add('Beginning Google Auth...');
    }
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
 
  getAuthCode(): Observable<any> {
    return this.http.get(
      this.authEndpoint,
      {
        responseType: 'text',
        params: this.params
      }
    ).pipe(
      tap(_ => this.log('Launching auth...')),
      catchError(this.handleError<any>('googleAuth'))
    )
  }
  
}
