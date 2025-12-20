import { Routes } from '@angular/router';
import {AuthInterceptor} from '../interceptors/auth-interceptor';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {LoginComponent} from './auth/login/login.component';
import {RegisterComponent} from './auth/register/register.component';
import {IndexComponent} from './layout/index.component/index.component';
import {AuthGuardService} from '../interceptors/auth-guard.service';
import {ProfileComponent} from './layout/profile/profile.component';
import {UserFeedComponent} from './layout/user-feed/user-feed.component';
import {AddPostComponent} from './elements/dialog-window/add-post/add-post.component';

export const routes :Routes = [
  {path: 'login', component:LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'main', component: IndexComponent, canActivate:[AuthGuardService]},
  {path: 'profile', component: ProfileComponent, canActivate:[AuthGuardService], children:[
      {path: '', component: UserFeedComponent, canActivate: [AuthGuardService]},
      {path: 'add', component: AddPostComponent, canActivate: [AuthGuardService]}
    ]},
  {path: '', redirectTo: 'main', pathMatch: 'full'}
];

export const authInterceptorProviders =[
  {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
];

