import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from "@angular/router";
import { AppComponent } from './app.component';
import { HistoryComponent } from './home/history/history.component';
import { HomeComponent } from './home/home.component';
import {FilterPipe} from './app.filter';
import {DataService} from './data.service';
import {FirebaseService} from './firebase.service';
import {GlobalService} from './global.service';
import { ManageComponent } from './home/manage/manage.component';
import { CalendarComponent } from './home/calendar/calendar.component';
import { AngularFireModule } from 'angularfire2';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './auth.service';
import { APP_ROUTES_PROVIDER } from './app.route';
import { RootComponent } from './root/root.component';
import { LocalStorageModule } from 'angular-2-local-storage';

export const firebaseConfig = {
  apiKey: "AIzaSyBYF9xMM-YegvX9w9ISPtcXmjh9rK2MaAk",
  authDomain: "fitstat-97ce6.firebaseapp.com",
  databaseURL: "https://fitstat-97ce6.firebaseio.com",
  storageBucket: "fitstat-97ce6.appspot.com",
  messagingSenderId: "435236142608"
};

@NgModule({
  declarations: [
    AppComponent,
    HistoryComponent,
    HomeComponent,
    FilterPipe,
    ManageComponent,
    CalendarComponent,
    LoginComponent,
    SignupComponent,
    RootComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    APP_ROUTES_PROVIDER,
    LocalStorageModule.withConfig({
        prefix: 'my-app',
        storageType: 'localStorage'
    })
  ],
  providers: [DataService,FirebaseService,AuthGuard,GlobalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
