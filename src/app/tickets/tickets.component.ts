import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Import HttpHeaders
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {
  newTicket: any = {};
  tickets: any[] = [];
  selectedTicket: any = {};
  userRole: string | null = null; // Initialize it here
  userId: string | null = null; // Add userId variable
  username: string | null = null;
  userData: any = {};
  constructor(private http: HttpClient, private router: Router,private datePipe: DatePipe) { }
  navigateToChat(chatId: string) {
    this.router.navigate(['/chat', chatId]);
  }
  ngOnInit(): void {
    const userDataStr = localStorage.getItem('userData');
    // Get user role from localStorage
    if (userDataStr) {
      this.userData = JSON.parse(userDataStr);
      this.userRole = this.userData.role; // Set userRole from userData
      this.userId = this.userData._id; // Set userId from userData
      this.username=this.userData.username
    }
      // Fetch tickets
      if (this.userRole==='support' || this.userRole==='administrator') {
        this.fetchTickets();
      } else {
        this.fetchUserTickets();
      }

    
  }
  fetchUserTickets(): void {
    this.http.get<any[]>(`http://localhost:3000/api/users/tickets`, { withCredentials: true }).subscribe({
      next: (response) => {
        console.log('User tickets fetched successfully:', response);
        this.tickets = response;
      },
      error: (err) => {
        console.error('Failed to fetch user tickets:', err);
      }
    });
  }
  
  fetchTickets(): void {
    this.http.get<any[]>('http://localhost:3000/api/admin/tickets', { withCredentials: true }).subscribe({
      next: (response) => {
        console.log('All tickets fetched successfully:', response);
        this.tickets = response;
      },
      error: (err) => {
        console.error('Failed to fetch tickets:', err);
      }
    });
  }
  
  

  onSubmit(): void {
    this.http.post<any>('http://localhost:3000/api/tickets', this.newTicket,{ withCredentials : true }).subscribe({
      next: (response) => {
        console.log('Ticket created successfully:', response);
        this.newTicket = {}; // Clear the form
        this.fetchUserTickets();
        
      },
      error: (err) => {
        console.error('Failed to create ticket:', err);
      }
    });
  }
  updateTicketForUser(ticket: any): void {
    if (this.userRole === 'user') {
      console.log(`Navigating to edit ticket with ID: ${ticket._id}`);
      this.router.navigate([`/tickets/edit/${ticket._id}`]).then(success => {
        if (success) {
          console.log('Navigation successful');
        } else {
          console.error('Navigation failed');
        }
      });
    } else {
      console.log('User does not have permission to update ticket for user.');
    }
  }

  updateTicketForSupport(ticket: any): void {
    if (this.userRole === 'support') {
      console.log(`Navigating to edit ticket with ID: ${ticket._id}`);
      this.router.navigate([`/tickets/edit/${ticket._id}`]).then(success => {
        if (success) {
          console.log('Navigation successful');
        } else {
          console.error('Navigation failed');
        }
      });
    } else {
      console.log('User does not have permission to update ticket for support.');
    }
  }
  acceptTicket(ticket: any):void{
    this.http.post<any>('http://localhost:3000/api/tickets/support/:id/accept', {ticket},{ withCredentials : true }).subscribe({
      next: (response) => {
        console.log('Ticket accepted successfully:', response);
        const supportId = response.supportId; // Assuming the support ID is returned in the response
        localStorage.setItem('supportId', supportId); // Save support ID to localStorage
        this.newTicket = {}; // Clear the form
        this.fetchTickets();
      },
      error: (err) => {
        console.error('Failed to accept ticket:', err);
      }
    });
  }
  
  

  /*updateTicketForUser(ticket: any): void {
    if (this.userRole === 'user') {
      this.http.put<any>(`http://localhost:3000/api/tickets/user/${ticket._id}`, { title: ticket.title, description: ticket.description },{ withCredentials : true }).subscribe({
        next: (response) => {
          console.log('Ticket updated successfully for user:', response);
          this.fetchUserTickets();
        },
        error: (err) => {
          console.error('Failed to update ticket for user:', err);
        }
      });
    } else {
      console.log('User does not have permission to update ticket for user.');
    }
  }

  updateTicketForSupport(ticket: any): void {
    if (this.userRole === 'support') {
      this.http.put<any>(`http://localhost:3000/api/tickets/support/${ticket._id}`, ticket,{ withCredentials : true }).subscribe({
        next: (response) => {
          console.log('Ticket updated successfully for support:', response);
          this.fetchTickets(); // Refresh the list of tickets
        },
        error: (err) => {
          console.error('Failed to update ticket for support:', err);
        }
      });
    } else {
      console.log('User does not have permission to update ticket for support.');
    }
  }*/

  deleteTicket(ticketId: string): void {
    console.log("ticket id",ticketId);
    this.http.delete<any>(`http://localhost:3000/api/tickets/${ticketId}`, { withCredentials: true }).subscribe({
      next: (response) => {
        console.log('Ticket deleted successfully:', response);
        if(this.userRole==='support'){
          this.fetchTickets(); // Refresh the list of tickets
        }else{
          this.fetchUserTickets();
        }
      },
      error: (err) => {
        console.error('Failed to delete ticket:', err);
      }
    });
  }
  onSelect(ticket: any): void {
    this.selectedTicket = { ...ticket }; // Create a copy to avoid modifying the original
  }
}
