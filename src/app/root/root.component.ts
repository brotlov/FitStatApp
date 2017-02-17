import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root1',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css']
})
export class RootComponent implements OnInit {

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

  constructor(public af: AngularFire,private router: Router) {

    this.af.auth.subscribe(auth => {
      if(auth) {
        this.name = auth;
      }
    });

  }

  ngOnInit() {
  }

  logout() {
     this.af.auth.logout();
     console.log('logged out');
     this.router.navigateByUrl('/login');
  }
}
