import {Injectable} from '@angular/core';
import {UserShowNameDto} from '../DTO/user/user-show-name.dto';

const TOKEN_KEY = "auth-token";
const RESPONSE_KEY = "success-response";
const USER_KEY = "auth-user";

@Injectable({providedIn:'root'})
export class TokenStorageService{
  public saveToken(token:string){
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken():string|null{
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveResponse(success: boolean ){
    window.sessionStorage.removeItem(RESPONSE_KEY);
    window.sessionStorage.setItem(RESPONSE_KEY, JSON.stringify(success));
  }

  public getResponse() : boolean{
    return JSON.parse(<string>sessionStorage.getItem(RESPONSE_KEY));
  }

  public saveName(user:UserShowNameDto){
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getName():UserShowNameDto{
    return JSON.parse(<string>window.sessionStorage.getItem(USER_KEY));
  }

  public logout(){
    window.sessionStorage.clear();
    window.location.reload();
  }
}
