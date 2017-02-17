import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
declare var firebase: any;

@Injectable()
export class FirebaseService {

  constructor(private http: Http) { }

  returnObject = [];

  fbGetData(ref1?, ref2?){
    return this.http.get('https://fitstat-97ce6.firebaseio.com/' + ref1 + '.json')
    .map((res) => res.json())
  }
  
  fbAddWorkoutHistory(date, name, completed, ref){
    if (completed === undefined) completed = false;
    
    firebase.database().ref(ref).push({date: date, workoutName: name, completed: completed});
  }

  fbDeleteItem(id, ref){
    var ref = firebase.database().ref(ref);
    var key = "";
      ref.orderByChild("id").equalTo(id).on("child_added", function(snapshot) {
        key = snapshot.key;
    })
      firebase.database().ref(ref).child(key).remove().then(function(){
    })
  }
}