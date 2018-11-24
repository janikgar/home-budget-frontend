import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import { API_URL } from './env';

@Injectable({
  providedIn: 'root'
})
export class FlaskApiService {

  constructor(private http: HttpClient) {

  }

  // private static _handleError(err: HttpErrorResponse | any) {
  //   return Observable.throw(err.message || 'Error: Unable to complete HTTP Request')
  // }

  getTables(): Observable<> {
    return this.http
      .get(`${API_URL}/data`);
      // .catch(FlaskApiService._handleError);
  }

}
