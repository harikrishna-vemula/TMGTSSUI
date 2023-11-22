// profile.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  firstName: string = '';
  lastName: string = '';
  userName: string = '';
  email: string = '';
  phoneNumber: string = '';
  password: string = '';
  address: string = '';
  showPassword: boolean = false; // Add this property
  passwordStrengthMessage: string = '';

  constructor() {}

  // Add your existing methods
  submitForm() {
    // Implement form submission logic here
  }

  cancel() {
    // Implement cancel button logic here
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
