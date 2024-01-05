import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from "@angular/router";
import { BehaviorSubject, Observable } from 'rxjs';




@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isExpanded = false;
  username = '';
  // isAdmin = false; isReader = false; isEditor = false;
   //private currentUserSubject: BehaviorSubject<any>;
  currentUser: any={ };
  //public currentUser: Observable<any>;
  constructor(public fb: FormBuilder, private authservice: AuthService, private router: Router) {
    //this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')!));
    //this.currentUser = this.currentUserSubject.asObservable();
    this.authservice.loginStatus$.subscribe((loggedIn: boolean) => {
      if (loggedIn) {
        this.ngOnInit(); // Reload header component
      }
    });
    
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')!);
    console.log('Current User:', this.currentUser);
  }
  get isAdmin() {
    return this.currentUser && this.currentUser.roleName === 'Admin';
  }

  get isReader() {
    return this.currentUser && this.currentUser.roleName === 'Reader';
  }

  get isEditor() {
    return this.currentUser && this.currentUser.roleName === 'Editor';
   
  }
  collapse() {
    this.isExpanded = false;
  }


  toggle() {
    this.isExpanded = !this.isExpanded;
  }
  //collapse() {
  //  this.isExpanded = false;
  //}

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login'])
      .then(() => {
        window.location.reload(); // Reloads the entire page
      });
  }
  

  ngOnInit() {
    //window.location.reload();
    //this.UserForm = this.formbulider.group({
    //  UserName: ['', [Validators.required]],
    //  LoginName: ['', [Validators.required]],
    //  Password: ['', [Validators.required]],
    //  Email: ['', [Validators.required]],
    //  ContactNo: ['', [Validators.required]],
    //  Address: ['', [Validators.required]],
    //});
    if (localStorage.getItem("currentUser") === null) {
      this.router.navigate(['login']);
    }
    else {
      //this.currentUser = localStorage.getItem("currentUser");
      //if (this.currentUser && this.currentUser.roleName === 'Admin') {
      //  this.isAdmin = true;
      //}
      //else if (this.currentUser && this.currentUser.roleName === 'Editor') {
      //  this.isEditor = true;
      //}
      //else if (this.currentUser && this.currentUser.roleName === 'Reader') {
      //  this.isReader = true;
      //}
      //else {
      //  this.isAdmin = false;
      //  this.isEditor = false;
      //  this.isReader = false;
      //}
      console.log(this.currentUser);
    }
    
  
  }
}
