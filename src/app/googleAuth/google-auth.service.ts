import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { MessageChannelService } from '../message/message-channel.service';

@Injectable({
  providedIn: 'root',
})
export class GoogleAuthService {
  constructor(private http: HttpClient,
              private messageService: MessageChannelService) { }

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

  endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

  params = {
    'scope': 'https://www.googleapis.com/auth/spreadsheets.readonly',
    'access_type': 'offline',
    'include_granted_scopes': 'true',
    'state': 'state_parameter_passthrough_value',
    'redirect_uri': 'http://localhost:4200/authFinish',
    'response_type': 'code',
    'client_id': '595882655149-kkk4ouuvd9ptuf51di12rv4vajkte523.apps.googleusercontent.com',
  }
 
  getAuth(): Observable<any> {
    return this.http.get(
      this.endpoint,
      {
        responseType: 'text',
        params: this.params
      }
    ).pipe(
      tap(_ => this.log('Launching auth...')),
      tap(x => this),
      catchError(this.handleError<any>('googleAuth'))
    )
  }
  
}
