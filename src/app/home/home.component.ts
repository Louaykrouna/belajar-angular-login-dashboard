import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  userRole: string | null = null; // Initialize it here
  userData: any = {};

  constructor(private router: Router) {}
  ngOnInit(): void {
    const userDataStr = localStorage.getItem('userData');
    // Get user role from localStorage
    if (userDataStr) {
      this.userData = JSON.parse(userDataStr);
      this.userRole = this.userData.role; // Set userRole from userData
    }
  }
  goToTickets() {
    this.router.navigate(['/tickets']);
  }
}

