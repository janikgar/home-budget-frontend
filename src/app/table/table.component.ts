import { Component, OnInit, OnChanges, AfterContentInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TillerDbService } from '../tillerDb/tiller-db.service';
import { MessageChannelService } from '../message/message-channel.service';
import { GoogleAuthService } from '../googleAuth/google-auth.service';
import * as moment from 'moment';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  table: Array<any>;
  keys: Array<any>;
  displayKeys: Array<any>;
  config_db: LocalForage;
  data_db: LocalForage;

  constructor(private tillerDb: TillerDbService,
              private messageService: MessageChannelService,
              private googleService: GoogleAuthService,
    ) { }

  ngOnInit() {
    this.config_db = this.tillerDb.config_db;
    this.data_db = this.tillerDb.txn_data_db;
    let id = "1wbnG31Z5QBm2fuyzZOY9XkSij0EERtX92wEHq9LbPiI"
    this.config_db.getItem("access_token").then( token => {
      let response = this.googleService.getSheet(token.toString(), id);
      if (response !== "") {
        this.keys = response['values'].shift();
        this.keys.splice(10, 1);
        response['values'].forEach((row) => {
          let record = {}
          let uid = row.splice(10, 1);
          row.forEach((cell, j) => {
            record[this.keys[j]] = cell
          })
          this.data_db.setItem(uid.toString(), record);
        });
      }
      
      this.displayKeys = [
        "Date",
        "Description",
        "Category",
        "Amount",
        "Account"
      ]
      
      this.table = [];

      var today = moment();
      console.log(moment("5/29/2017").isAfter(today.subtract(30, 'days')))

      this.data_db.iterate((value) => {
        let withinWindow = moment().subtract(30, 'days').isSameOrBefore(moment(value["Date"]));
        if (withinWindow) {
          let row = [];
          for (let key of this.displayKeys) {
            row.push(value[key])
          }
          this.table.unshift(row);
        }
      }).then( () => {
        this.messageService.add('Rows iterated');
      }).catch( err => {
        this.messageService.add(err);
      });
    });
  }
}
