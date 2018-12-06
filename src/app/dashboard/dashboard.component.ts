import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  txn_table: object;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    if (window.localStorage.getItem('accessToken')) {
      var req = this.http.get(
        'https://sheets.googleapis.com/v4/spreadsheets/1wbnG31Z5QBm2fuyzZOY9XkSij0EERtX92wEHq9LbPiI/values/Transactions!A1:O5000'
      );
      req.subscribe(
        res => {
          // this.txn_table = res;
          alert(res);
          window.localStorage.setItem('table', JSON.stringify(res));
        },
        err => {
          alert(err);
          console.error(err);
        }
      )
    }
  }

}
