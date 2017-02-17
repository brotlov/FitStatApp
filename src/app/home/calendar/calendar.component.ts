import { Component, OnInit } from '@angular/core';
declare var firebase: any;

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  dayList = [
    {name: "Monday"},
    {name: "Tuesday"},
    {name: "Wednesday"},
    {name: "Thursday"},
    {name: "Friday"},
    {name: "Saturday"},
    {name: "Sunday"}
    ];
  workoutList = [];
  id: any;

  fbGetData(){
    firebase.database().ref("/Workoutlist").on('child_added', (snapshot) =>{
      this.workoutList.push(snapshot.val());
      this.id = this.workoutList.length;
    });

    firebase.database().ref("/Workoutlist").on('child_removed', (snapshot) =>{
      var id = snapshot.val().id;
      var index = this.workoutList.findIndex(x => x.id==id);
      this.workoutList.splice(index, 1);
    });

  }

  constructor() { }

  ngOnInit() {
    this.fbGetData();
  }

}
