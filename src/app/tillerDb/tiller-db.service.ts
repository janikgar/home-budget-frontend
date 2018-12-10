import { Injectable } from '@angular/core';
import * as localForage from 'localforage';

@Injectable({
  providedIn: 'root'
})
export class TillerDbService {
  constructor() {
    localForage.config({
      driver: localForage.INDEXEDDB,
    });
  }
  
  config_db = localForage.createInstance({
    name: 'tiller_home',
    storeName: 'tiller_home_config'
  });
  
  txn_data_db = localForage.createInstance({
    name: 'tiller_home',
    storeName: 'tiller_home_txn_data'
  })

}
