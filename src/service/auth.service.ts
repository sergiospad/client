import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EndpointBuilder} from '../util/endpoint-builder';
import {SigninRequest} from '../DTO/auth/signin-request';
import {Observable} from 'rxjs';
import {SignupRequest} from '../DTO/auth/signup-request';

@Injectable({providedIn: 'root'})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly authAPI = new EndpointBuilder('auth');

  public login(user: SigninRequest): Observable<any> {
    return this.http.post(this.authAPI.build('signin'), {
      username: user.username,
      password: user.password
    });
  }

  public register(user:SignupRequest):Observable<any>{
    return this.http.post(this.authAPI.build('signup'), {
      email:user.email,
      username:user.username,
      lastname:user.lastname,
      firstname:user.firstname,
      password:user.password,
      confirmPassword:user.confirmPassword
    })
  }
}
