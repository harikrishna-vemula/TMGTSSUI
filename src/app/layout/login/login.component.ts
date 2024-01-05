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
  constructor(public fb: FormBuilder, private authservice: AuthService, private router: Router) {}

  loginForm = this.fb.group({
    username: ['', [Validators.required]],
    Password: ['', [Validators.required]]
  });

  ngOnInit() {
    localStorage.removeItem('currentUser');
    this.submitForm();
  }

  submitForm() {
    if (this.loginForm.valid) {
      this.authservice.login(this.loginForm.value).subscribe(data => {
        if (data.Status === 'Success') {
          localStorage.setItem('currentUser', JSON.stringify(data.users));
          this.authservice.setLoginStatus(true);
          
          // Navigate to the primarytenant route
          this.router.navigate(['/scoresheet']).then(() => {
            // Reload the current route (primarytenant)
            this.router.navigateByUrl('/scoresheet', { skipLocationChange: true }).then(() => {
              window.location.reload()
              this.router.navigate(['/scoresheet']);
            });
          });
        } else {
          localStorage.removeItem('currentUser');
          localStorage.removeItem('token');
          // alert("Incorrect login Credentials....");
        }
      });
    }
  }
}
