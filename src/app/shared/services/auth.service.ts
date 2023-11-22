import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url: string;
  constructor(private _http: HttpClient) { 
     this.url = 'http://localhost:3000/';
     }

  register1(signupObj:any){
    console.log(signupObj,"signupobj");
    return this._http.post(this.url + 'register',signupObj)

  }
  login(loginObj:any){
    return this._http.post(this.url + 'login',loginObj)
  }

  storeToken(tokenValue: string){
    localStorage.setItem('token',tokenValue)
  }

  getToken(){
    localStorage.getItem('token')
  }

  isloggedIn():boolean{
    return !!localStorage.getItem('token')
  }
}
