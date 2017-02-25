import { Injectable } from '@angular/core';

@Injectable()
export class GlobalService {
  private userKey;
  constructor() { }
  
  setUserKeyValue(val){
    this.userKey = val;
  }
  getUserKeyValue(){
    return this.userKey;
  }
}