import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private authService: AuthService) {} // Inject your authentication service

  // Define the logout method
  logout() {
    // this.authService.logout(); // Call your authentication service's logout method
  }
}
