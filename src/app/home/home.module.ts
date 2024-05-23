import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketsComponent } from '../tickets/tickets.component'; // Import the TicketsComponent here
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { FormsModule } from '@angular/forms';
import { WelcomeModule } from '../welcome/welcome.module'; // Importing WelcomeModule
import { MessengerieComponent } from '../messengerie/messengerie.component'; // Import MessengerieComponent here
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    HomeComponent,
    TicketsComponent, // Add the TicketsComponent here
    MessengerieComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NavBarComponent,
    FormsModule,
    WelcomeModule, // Importing the module containing WelcomeComponent
    SharedModule


  
  ]
})
export class HomeModule { }
