import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { FlaskApiService } from './flask-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'tiller-home';
  tableList = [];
  flaskApiSub: Subscription;

  constructor(private flaskApi: FlaskApiService) {
  }

  ngOnInit() {
    this.flaskApiSub = this.flaskApi
      .getTables()
      .subscribe(res => {
        this.tableList = res;
      },
      console.error
      );
  }

  ngOnDestroy() {
    this.flaskApiSub.unsubscribe();
  }
}
