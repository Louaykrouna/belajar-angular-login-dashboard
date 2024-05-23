import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule here
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EditTicketComponent } from './edit-ticket/edit-ticket.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { DatePipe } from '@angular/common';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { ReactiveFormsModule } from '@angular/forms';
import { UserTableComponent } from './user-table/user-table.component';
import { ChatService } from './services/chatService';
import { SharedModule } from './shared/shared.module';
const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    EditTicketComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    HttpClientModule, // Import HttpClientModule here
    FormsModule, // Add FormsModule here
    CommonModule,
    ReactiveFormsModule,
    NavBarComponent,
    UserTableComponent,
    SharedModule,
    SocketIoModule.forRoot(config) 
  ],
  providers: [DatePipe,ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
