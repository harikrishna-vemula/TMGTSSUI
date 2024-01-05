import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, BehaviorSubject, Subject } from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  getAllUsers() {
    throw new Error('Method not implemented.');
  }
  getRoles(): any[] {
    throw new Error('Method not implemented.');
  }
  getStatus(): any[] {
    throw new Error('Method not implemented.');
  }
  url: string;
  isExpanded = false;
  username = '';
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  constructor(private _http: HttpClient) {
    this.url = 'http://localhost:5132/api/';
    this.currentUserSubject = new BehaviorSubject<any>(localStorage.getItem('currentUser'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  register1(signupObj: any) {
    console.log(signupObj, "signupobj");
    return this._http.post(this.url + 'register', signupObj)

  }
  login(loginObj: any) {
    
    return this._http.get<any>(this.url + 'Users/' + loginObj.username + '/' + loginObj.Password)
      .pipe(map(data => {

        if (data.users) {
          localStorage.setItem('currentUser', JSON.stringify( data.users));

          //localStorage.setItem('token', data.token)
          //localStorage.setItem('currentUser', data.user);
          //this.currentUserSubject.next(data.users);
        }
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
  private loginStatusSubject = new Subject<boolean>();

  loginStatus$ = this.loginStatusSubject.asObservable();

  setLoginStatus(status: boolean) {
    this.loginStatusSubject.next(status);
  }
}
