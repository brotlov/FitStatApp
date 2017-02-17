import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
declare var firebase: any;

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  workoutName: string = null;
  workoutExercises: string = null;
  failedValidation=false;
  checkedDays = [];
  dayList = [
    {name: "Monday", checked: false},
    {name: "Tuesday", checked: false},
    {name: "Wednesday", checked: false},
    {name: "Thursday", checked: false},
    {name: "Friday", checked: false},
    {name: "Saturday", checked: false},
    {name: "Sunday", checked: false},
  ];
  
  
  editWorkoutName = "";
  addWorkoutWidgetShown = false;
  editWorkoutWidgetShown = false;
  workoutList = [];
  id: any;

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
    this.editWorkoutWidgetShown = true;
    var ref = firebase.database().ref("/Workoutlist");
    var key = "";
    var dataObject:any;
    ref.orderByChild("id").equalTo(id).on("child_added", function(snapshot) {
       key = snapshot.key;
       dataObject = snapshot.val();
    })
    this.editWorkoutName = dataObject.name;
    this.workoutName = dataObject.name;
    this.workoutExercises = dataObject.exercises;
    var checkedDayList = dataObject.day;
    for(var i = 0; i < this.dayList.length; i++) {
        if (this.dayList[i].name == checkedDayList) {
            this.dayList[i].checked = true
            break;
        }
    }
  }

  showAddWorkoutWidget(){
    this.addWorkoutWidgetShown = !this.addWorkoutWidgetShown
  }

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
      firebase.database().ref("/Workoutlist").push({id: this.id + 1, name: workoutName, exercises: exercises, day: this.checkedDays});
      this.workoutName = '';
      this.workoutExercises = '';
      this.addWorkoutWidgetShown=false;
      this.id++;
    }
  }

  fbDeleteItem(id){
    var ref = firebase.database().ref("/Workoutlist");
    var key = "";
    ref.orderByChild("id").equalTo(id).on("child_added", function(snapshot) {
       key = snapshot.key;
    })
    firebase.database().ref("/Workoutlist").child(key).remove().then(function(){
  })
}
 

  constructor() { 
    
  }

  ngOnInit() {
    this.fbGetData();
  }

}
