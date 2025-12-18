import {Injectable} from '@angular/core';

const TOKEN_KEY = "auth-token";
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
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(success));
  }

  public getResponse() : boolean{
    return JSON.parse(<string>sessionStorage.getItem(USER_KEY));
  }

  public logout(){
    window.sessionStorage.clear();
    window.location.reload();
  }
}
