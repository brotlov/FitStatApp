import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { Router } from '@angular/router';
import {GlobalService } from '../global.service';
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
  selector: 'app-root1',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css']
})
export class RootComponent implements OnInit {

  test = "asdfasdf";
  userName = "loading..."; 
  name: any;
  state: string = '';
  menuToggle = false;
  settingsToggle = false;

  toggleMenu(){
    if (this.menuToggle) this.menuToggle = false;
    else this.menuToggle = true
  }
  toggleSettingsMenu(){
    if (this.settingsToggle) this.settingsToggle = false;
    else this.settingsToggle = true
  }

  constructor(public af: AngularFire,private router: Router,private globals: GlobalService,private localStorageService: LocalStorageService) {

    this.af.auth.subscribe(auth => {
      if(auth) {
        this.name = auth;
      }
    });
  }

  ngOnInit() {
    this.fbGetName();
  }

  fbGetName(){
    firebase.database().ref("/Users").on('child_added', (snapshot) =>{
      if (snapshot.key === this.localStorageService.get('userKey').toString()){
        this.userName = snapshot.val().name;
      }
    })
  }

  logout() {
     this.af.auth.logout();
     this.router.navigateByUrl('/login');
     
  }
}
