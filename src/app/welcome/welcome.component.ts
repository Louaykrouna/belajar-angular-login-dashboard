import { Component, OnInit } from '@angular/core';
import { UserObjType } from '../type/type-interfaces';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  userData: UserObjType | null = null;
  welcomeMessage: string = 'Welcome!';

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('userData') || '{}');
    this.setWelcomeMessage();
  }

  private setWelcomeMessage(): void {
    // Logic to set a custom welcome message based on user data, if needed
    if (this.userData) {
      this.welcomeMessage = `Welcome, ${this.userData.username}!`; // Example: Display the user's first name
    }
  }
}
