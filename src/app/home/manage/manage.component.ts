import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
declare var firebase: any;

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

dayList = [
    {name: "Monday", checked: false},
    {name: "Tuesday", checked: false},
    {name: "Wednesday", checked: false},
    {name: "Thursday", checked: false},
    {name: "Friday", checked: false},
    {name: "Saturday", checked: false},
    {name: "Sunday", checked: false},
  ];
  workoutId:any;
  workoutName: string = null;
  workoutExercises: string = null;
  failedValidation=false;
  checkedDays = [];
  addWorkoutWidgetShown = false;
  editWorkoutWidgetShown = false;
  workoutList = [];

  updateChecked(value,event){
    if(event.target.checked){
      this.checkedDays.push(value);
    }
    else if (!event.target.checked){
      let indexx = this.checkedDays.indexOf(value);
      this.checkedDays.splice(indexx,1);
    }
  }

  fbEditItem(id){
    this.workoutName = '';
    this.workoutExercises = '';
    this.checkedDays.length = 0;
    for(var i = 0; i < this.dayList.length; i++) {
        this.dayList[i].checked = false;
      }
    this.workoutId = id
    this.addWorkoutWidgetShown=false;
    this.editWorkoutWidgetShown = true;
    firebase.database().ref("/Workoutlist/" + id).once('value', (snapshot) =>{
      this.workoutName = snapshot.val().name;
      this.workoutExercises = snapshot.val().exercises;
      var checkedDayList = snapshot.val().day;
      for(var i = 0; i < this.dayList.length; i++) {
        if (checkedDayList.includes(this.dayList[i].name)) {
            this.dayList[i].checked = true;
            this.checkedDays.push(this.dayList[i].name);
        }
      }
    });
  }

  showAddWorkoutWidget(){
    this.workoutName = '';
    this.workoutExercises = '';
    this.checkedDays.length = 0;
    for(var i = 0; i < this.dayList.length; i++) {
        this.dayList[i].checked = false;
      }
    this.editWorkoutWidgetShown = false;
    this.addWorkoutWidgetShown = !this.addWorkoutWidgetShown;
  }

  fbGetData(){
    firebase.database().ref("/Workoutlist").on('child_added', (snapshot) =>{
      var snapshotVal = snapshot.val();
      snapshotVal.id=snapshot.key;
      this.workoutList.push(snapshotVal);
    });

    firebase.database().ref("/Workoutlist").on('child_changed', (snapshot) =>{
      var index = this.workoutList.findIndex(x => x.name==snapshot.val().name);
      var snapshotVal = snapshot.val();
      snapshotVal.id=snapshot.key;
      this.workoutList[index]=snapshotVal;
    });

    firebase.database().ref("/Workoutlist").on('child_removed', (snapshot) =>{
      var index = this.workoutList.findIndex(x => x.name==snapshot.val().name);
      this.workoutList.splice(index, 1);
    });

  }

  addToList(workoutName){
    var ref = firebase.database().ref("/Workoutlist");
    var key = "";
    ref.orderByChild("id").equalTo(workoutName).on("child_added", function(snapshot) {
       key = snapshot.key;
       
  });  
}

  fbPostData(workoutName, exercises){
    if (workoutName == undefined){
      this.failedValidation=true;
    }
    if (exercises == undefined){
      exercises = "";
    }
    if (workoutName != undefined){
      firebase.database().ref("/Workoutlist").push({name: workoutName, exercises: exercises, day: this.checkedDays});
      this.workoutName = '';
      this.workoutExercises = '';
      this.addWorkoutWidgetShown=false;
      this.checkedDays.length = 0
    }
  }

  fbUpdateData(workoutName, exercises,id){
    if (workoutName == undefined){
      this.failedValidation=true;
    }
    if (exercises == undefined){
      exercises = "";
    }
    if (workoutName != undefined){
      firebase.database().ref("/Workoutlist/" + id).update({name: workoutName, exercises: exercises, day: this.checkedDays})
    }
  }

  fbDeleteItem(id){
    console.log(id);
    firebase.database().ref("/Workoutlist/" + id).remove().then(function(){
  })
}
 

  constructor() { 
    
  }

  ngOnInit() {
    this.fbGetData();
  }

}
