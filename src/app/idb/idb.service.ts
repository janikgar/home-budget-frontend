import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IdbService {
  db;

  constructor() {
    var request = window.indexedDB.open('tiller-home')
    request.onerror = () => {
      console.log('IndexedDB not available');
    };
    request.onsuccess = event => {
      this.db = event.target.result;
    }
  }
}
