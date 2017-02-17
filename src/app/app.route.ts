import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {HomeComponent} from './home/home.component';
import {HistoryComponent} from './home/history/history.component';
import {ManageComponent} from './home/manage/manage.component';
import {CalendarComponent} from './home/calendar/calendar.component';
import { AuthGuard } from './auth.service';
import { SignupComponent } from './signup/signup.component';
import { RootComponent } from './root/root.component';

export const router: Routes = [
    
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: '', component: RootComponent, canActivate: [AuthGuard],
        children: [
            {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
            {path: 'history', component: HistoryComponent, canActivate: [AuthGuard]},
            {path: 'manage', component: ManageComponent, canActivate: [AuthGuard]},
            {path: 'calendar', component: CalendarComponent, canActivate: [AuthGuard]},
        ]
    },
]

export const APP_ROUTES_PROVIDER = RouterModule.forRoot(router);