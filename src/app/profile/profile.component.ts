import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
  showPassword: boolean = false;
  passwordStrengthMessage: string = '';

  submitForm() {
    // Add your form submission logic here
    console.log('Form submitted:', this.firstName, this.lastName, this.userName, this.email, this.phoneNumber, this.password, this.address);
  }

  cancel() {
    // Add your cancel logic here
    console.log('Form canceled');
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}

@NgModule({
  declarations: [ProfileComponent],
  imports: [CommonModule, FormsModule],
  exports: [ProfileComponent]
})
export class ProfileModule { }
