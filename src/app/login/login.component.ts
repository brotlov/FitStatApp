import { Component, OnInit, HostBinding } from '@angular/core';
import {AngularFire, AuthProviders, AuthMethods} from 'angularfire2';
import {Router } from '@angular/router';
import {GlobalService } from '../global.service';
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  bgImage = '/images/login-bg-stock.jpg';
  error: any;
  innerHeight = (window.innerHeight) + "px";

  constructor(public af: AngularFire,private router: Router,private globals: GlobalService,private localStorageService: LocalStorageService) {
      this.af.auth.subscribe(auth => { 
      if(auth) {
        this.router.navigateByUrl('/home');
      }
    });
  }

  onSubmit(formData) {
    if(formData.valid) {
      this.af.auth.login({
        email: formData.value.email,
        password: formData.value.password
      },
      {
        provider: AuthProviders.Password,
        method: AuthMethods.Password,
      }).then(
        (success) => {
          this.fbGetCurrentUserKey(formData.value.email);
          this.router.navigate(['/home']);
      }).catch(
        (err) => {
        this.error = err;
      })
    }
  }

  loginFb() {
    this.af.auth.login({
      provider: AuthProviders.Facebook,
      method: AuthMethods.Popup,
    }).then(
        (success) => {
        this.router.navigate(['/home']);
      }).catch(
        (err) => {
        this.error = err;
      })
  }

  loginGoogle() {
    this.af.auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup,
    }).then(
        (success) => {
        this.router.navigate(['/home']);
      }).catch(
        (err) => {
        this.error = err;
        
      })
  }

  fbGetCurrentUserKey(email){
    firebase.database().ref("/Users").on('child_added', (snapshot) =>{
      var e = snapshot.val().email;
      if (e === email){
        this.localStorageService.set("userKey",snapshot.key);
        this.globals.setUserKeyValue(snapshot.key);
      }
    })
  }
  fbCreateNewUserKey(){

  }

  ngOnInit() {
  }

}
