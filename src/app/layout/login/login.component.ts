import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(public fb: FormBuilder, private authservice: AuthService, private router: Router,) {}
  loginForm = this.fb.group({
    username:['', [Validators.required]],
    Password:['', [Validators.required]]
    // subjects: [this.SubjectsArray],
  });

  submitForm() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value, "loginForm values");
      this.authservice.login(this.loginForm.value)
        .subscribe(data => {

          if (data.Status === 'Success') {
            //localStorage.setItem("token", data.token);
            this.router.navigate(['/primarytenant']);
          }
          else {
            //this.errorMessage = "Incorrect login Credentials...."
            alert("Incorrect login Credentials....");
          }
          //this.spinnerService.hide();
        });

      //this.authservice.login(this.loginForm.value).subscribe({
      //  next:(res)=>{
      //    alert("Login successfull")
      //    // alert(res.message)
      //  },
      //  error:(err)=>{
      //    // alert(err?.error.message)
      //    alert("error in Login")
      //  },
      //})
    }
    else{

    }
  }
}
