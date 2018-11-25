import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'tiller-home';
  tableList = [];
  flaskApiSub: Subscription;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }
}
