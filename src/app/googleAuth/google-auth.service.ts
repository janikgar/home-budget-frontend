import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {

  private authUrl = '';

  constructor(private http: HttpClient) { }

  getAuth(): Observable<any> {
    return this.http.get(
      'https://accounts.google.com/o/oauth2/v2/auth',
      {
        params: {
          'client_id': '595882655149-kkk4ouuvd9ptuf51di12rv4vajkte523.apps.googleusercontent.com',
          'scope': 'https://www.googleapis.com/auth/spreadsheets.readonly',
          'redirect_uri': 'http://localhost:4200',
          'access_type': 'offline',
          'response_type': 'code',
        }
      }
    )
  }
  
}
