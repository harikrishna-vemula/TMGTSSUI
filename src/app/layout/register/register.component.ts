import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  Roles: any = ['Admin', 'Author', 'Reader'];

  constructor(public fb: FormBuilder, private authservice: AuthService ,private router:Router) { }
  register = this.fb.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required]],
    Password: ['', [Validators.required]],
    roles: ['', [Validators.required]],
    // subjects: [this.SubjectsArray],
  });

  submitForm() {
    if (this.register.valid) {
      console.log(this.register.value, "register values");
      this.authservice.register1(this.register.value).subscribe({
        next:(res)=>{
          alert("registration successfull")
          // alert(res.message)
          this.register.reset()
          this.router.navigate(['/login'])

        },
        // error:(err)=>{
        //   // alert(err?.error.message)
        //   alert("error in registration")
        // },
      })
    }
    else{

    }
  }
}
