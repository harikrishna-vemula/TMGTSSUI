import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UsersService } from 'src/app/users/users.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  Roles: any = ['Admin', 'Editor', 'Reader'];

  constructor(public fb: FormBuilder, private authservice: AuthService ,private router:Router,private _http:UsersService) { }
  register = this.fb.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required]],
    Password: ['', [Validators.required]],
    roles: ['', [Validators.required]],
    // subjects: [this.SubjectsArray],
  });

  // submitForm() {
  //   if (this.register.valid) {
  //     console.log(this.register.value, "register values");
  //     this.authservice.register1(this.register.value).subscribe({
  //       next:(res)=>{
  //         alert("registration successfull")
  //         // alert(res.message)
  //         this.register.reset()
  //         this.router.navigate(['/login'])

  //       },
  //       error:(err)=>{
  //         // alert(err?.error.message)
  //         alert("error in registration")
  //       },
  //     })
      onSubmit(){
        // console.log(this.createUser.value,"post data");
                this._http.createUser(this.register.value).subscribe((res)=>{

          console.log(res,"posted data");
          
        })
        // alert("Registration Sucessful")
        
      }
  
  }


