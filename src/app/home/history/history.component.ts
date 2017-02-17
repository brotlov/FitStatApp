import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Rx';
declare var firebase: any;

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  ref1 = "/WorkoutHistory";
  ref2 = "/Workoutlist";
  workoutHistory = [];
  workoutList = [];
  id:any;
    
  constructor() { }

  ngOnInit() {
    this.fbGetData();
    this.fbGetWorkoutList();
  }

  // fbAddData(date, workoutName, completed){
  //   if (date != undefined && name != undefined)
  //   this.firebaseService.fbAddWorkoutHistory(date, workoutName, completed, this.ref1);
  // }
  fbGetWorkoutList(){
    firebase.database().ref("/Workoutlist").on('child_added', (snapshot) =>{
      this.workoutList.push(snapshot.val());
    });
  };
  fbGetData(){
    firebase.database().ref("/WorkoutHistory").on('child_added', (snapshot) =>{
      this.workoutHistory.push(snapshot.val());
      this.id = this.workoutHistory.length;
    });

    firebase.database().ref("/WorkoutHistory").on('child_removed', (snapshot) =>{
      var id = snapshot.val().id;
      var index = this.workoutHistory.findIndex(x => x.id==id);
      this.workoutHistory.splice(index, 1);
    });
  }
  
}
