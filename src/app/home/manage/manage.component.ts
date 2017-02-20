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
  planId:any;
  planName: string = null;
  workoutName: string = null;
  oldWorkoutName: string = null;
  workoutExercises: string = null;
  planWorkouts: string = null;
  selectedPlanWorkouts: string = null;
  oldPlanName: string = null;
  highlightedDiv: number;
  checkedDays = [];
  workoutList = [];
  planList = [];
  failedValidation=false;
  workoutInfoShown = false;
  addWorkoutWidgetShown = false;
  editWorkoutWidgetShown = false;
  editPlanWidgetShown = false;
  addPlanWidgetShown = false;
  editPlanName = "";
  currentActiveSection = "";
  

  toggleActivePlan(id,currentStatus,name){
    currentStatus = !currentStatus;
    this.oldPlanName = name;
    // firebase.database().ref().child("/Planlist").orderByValue('active').equalTo('active');
    firebase.database().ref("/Planlist/" + id).update({active:currentStatus})
    
  }

  toggleHighlight(newValue: number) {
    if (this.highlightedDiv === newValue) {
      this.highlightedDiv = 0;
    }
    else {
      this.highlightedDiv = newValue;
    }
  }

  managePlans(){
    this.currentActiveSection="plan";
    this.addWorkoutWidgetShown = false;
    this.editWorkoutWidgetShown = false;
  }

  manageWorkouts(){
    this.currentActiveSection="workout";
    this.addPlanWidgetShown = false;
    this.editPlanWidgetShown = false;
  }

  manageExercises(){
    this.currentActiveSection="exercises";
  }

  editPlan(id){
    this.planId = id
    firebase.database().ref("/Planlist/" + id).once('value', (snapshot) =>{
      this.selectedPlanWorkouts = snapshot.val().workouts;
      this.oldPlanName = snapshot.val().name;
      this.planName = snapshot.val().name;
    });
    this.editPlanWidgetShown=true;
    this.addPlanWidgetShown=false;
  }

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
      this.oldWorkoutName = snapshot.val().name;
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

  showAddPlanWidget(){
    this.editPlanWidgetShown = false;
    this.addPlanWidgetShown= !this.addPlanWidgetShown;
    this.planName = '';
    this.workoutExercises = '';
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
    firebase.database().ref("/Planlist").on('child_added', (snapshot) =>{
      var snapshotVal = snapshot.val();
      snapshotVal.id=snapshot.key;
      this.planList.push(snapshotVal);
    });

    firebase.database().ref("/Workoutlist").on('child_changed', (snapshot) =>{
      var index = this.workoutList.findIndex(x => x.name==this.oldWorkoutName);
      var snapshotVal = snapshot.val();
      snapshotVal.id=snapshot.key;
      this.workoutList[index]=snapshotVal;
      this.oldWorkoutName=snapshot.val().name;
    });
    firebase.database().ref("/Planlist").on('child_changed', (snapshot) =>{
      var index = this.planList.findIndex(x => x.name==this.oldPlanName);
      var snapshotVal = snapshot.val();
      snapshotVal.id=snapshot.key;
      this.planList[index]=snapshotVal;
      this.oldPlanName=snapshot.val().name;
    });
    firebase.database().ref("/Workoutlist").on('child_removed', (snapshot) =>{
      var index = this.workoutList.findIndex(x => x.name==snapshot.val().name);
      this.workoutList.splice(index, 1);
    });
    firebase.database().ref("/Planlist").on('child_removed', (snapshot) =>{
      var index = this.planList.findIndex(x => x.name==snapshot.val().name);
      this.planList.splice(index, 1);
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
      this.planName = '';
      this.planWorkouts = '';
      this.addWorkoutWidgetShown=false;
    }
  }

  fbPostPlanData(name, workouts){
    if (name == undefined){
      this.failedValidation=true;
    }
    if (workouts == undefined){
      workouts = "";
    }
    if (name != undefined){
      firebase.database().ref("/Planlist").push({name: name, workouts: workouts});
      this.workoutName = '';
      this.workoutExercises = '';
      this.addPlanWidgetShown=false;
      this.checkedDays.length = 0
    }
  }

  fbUpdateData(oldWorkoutName,newWorkoutName, exercises,id){
    if (newWorkoutName == undefined){
      this.failedValidation=true;
    }
    if (exercises == undefined){
      exercises = "";
    }
    if (newWorkoutName != undefined){
      firebase.database().ref("/Workoutlist/" + id).update({name: newWorkoutName, exercises: exercises, day: this.checkedDays})
    }
  }

  fbUpdatePlanData(oldPlanName, newPlanName, workouts,id){
    if (newPlanName == undefined){
      this.failedValidation=true;
    }
    if (workouts == undefined){
      workouts = "";
    }
    if (newPlanName != undefined){
      firebase.database().ref("/Planlist/" + id).update({name: newPlanName, workouts: workouts})
    }
  }

  fbDeleteItem(id){
    firebase.database().ref("/Workoutlist/" + id).remove().then(function(){
    })
  }
  fbDeletePlan(id){
    firebase.database().ref("/Planlist/" + id).remove().then(function(){
    })
  }

  constructor() { 
  }

  ngOnInit() {
    this.fbGetData();
  }
}