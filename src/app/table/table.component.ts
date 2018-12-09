import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  table: object[][];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    let token = window.localStorage.getItem("access_token")
    let id = "1wbnG31Z5QBm2fuyzZOY9XkSij0EERtX92wEHq9LbPiI"
    this.http.get(
      `https://sheets.googleapis.com/v4/spreadsheets/${id}/values/Transactions!A1:O`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }
    ).subscribe(
      response => {
        this.table = response['values'];
      },
      err => {
        console.log(err);
      }
    )
  }
}
