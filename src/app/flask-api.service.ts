import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import 'rxjs/add/observable/';
import { API_URL } from './env';
import { TableComponent } from './table/table.component';

@Injectable({
  providedIn: 'root'
})
export class FlaskApiService {

  constructor(private http: HttpClient) {

  }

  // private static _handleError(err: HttpErrorResponse | any) {
  //   return Observable.throw(err.message || 'Error: Unable to complete HTTP Request')
  // }

  getTables(): Observable<any> {
    return this.http
      .get(`${API_URL}/`);
      // .catch(FlaskApiService._handleError);
  }

}
