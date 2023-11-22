import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, BehaviorSubject } from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url: string;
  constructor(private _http: HttpClient) {
    this.url = 'http://localhost:5132/api/';
  }

  register1(signupObj: any) {
    console.log(signupObj, "signupobj");
    return this._http.post(this.url + 'register', signupObj)

  }
  login(loginObj: any) {
    
    return this._http.get<any>(this.url + 'Users/' + loginObj.username + '/' + loginObj.Password)
      .pipe(map(data => {

        //if (data.users && data.token) {
        //  localStorage.setItem('currentUser', JSON.stringify(data.users));
        //  //localStorage.setItem('currentUser', data.user);
        //  //this.currentUserSubject.next(data.users);
        //}
        return data;
      }));
  }

  storeToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue)
  }

  getToken() {
    localStorage.getItem('token')
  }

  isloggedIn(): boolean {
    return !!localStorage.getItem('token')
  }
}
