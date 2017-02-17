import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Rx';
declare var firebase: any;

@Injectable()
export class DataService {

  returnObject = [];

  constructor(private http: Http) { }

  fbGetData(ref1, ref2?){
    firebase.database().ref(ref1).on('child_added', (snapshot) =>{
      this.returnObject.push(snapshot.val());
      return this.returnObject
      // .map((res) => res.json());
    });
  }
 
  fetchData(ref){
    return this.http.get('https://fitstat-97ce6.firebaseio.com/.json')
    .map((res) => res.json()
    );
  }
}