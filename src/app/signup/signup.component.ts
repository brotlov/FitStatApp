import { Component, OnInit, HostBinding } from '@angular/core';
import {AngularFire, AuthProviders, AuthMethods} from 'angularfire2';
import {Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  bgImage = '/images/login-bg2-stock.jpg';
  state: string = '';
  error: any;
  innerHeight = (window.innerHeight) + "px";

  constructor(public af: AngularFire,private router: Router) {

  }

  onSubmit(formData) {
    if(formData.valid) {
      this.af.auth.createUser({
        email: formData.value.email,
        password: formData.value.password
      }).then(
        (success) => {
        this.router.navigate(['/'])
      }).catch(
        (err) => {
        this.error = err;
      })
    }
  }

  ngOnInit() {
  }

}
