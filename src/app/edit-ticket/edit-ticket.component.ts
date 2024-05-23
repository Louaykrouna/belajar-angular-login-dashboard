import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-ticket',
  templateUrl: './edit-ticket.component.html',
  styleUrls: ['./edit-ticket.component.css']
})
export class EditTicketComponent implements OnInit {
  ticket: any = {};
  userRole: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    console.log('EditTicketComponent initialized'); // Add this log
    const userDataStr = localStorage.getItem('userData');
    if (userDataStr) {
      const userData = JSON.parse(userDataStr);
      this.userRole = userData.role;
    }

    const ticketId = this.route.snapshot.paramMap.get('id');
    if (ticketId) {
      this.getTicket(ticketId);
    }
  }

  getTicket(ticketId: string): void {
    let getUrl = '';
    if (this.userRole === 'user') {
      getUrl = `http://localhost:3000/api/tickets/user/${ticketId}`;
    } else if (this.userRole === 'support') {
      getUrl = `http://localhost:3000/api/tickets/support/${ticketId}`;
    }
    this.http.get<any>(getUrl, { withCredentials: true }).subscribe({
      next: (response) => {
        this.ticket = response;
      },
      error: (err) => {
        console.error('Failed to fetch ticket:', err);
      }
    });
  }

  onSubmit(): void {
    let updateUrl = '';
    if (this.userRole === 'user') {
      updateUrl = `http://localhost:3000/api/tickets/user/${this.route.snapshot.paramMap.get('id')}`;
    } else if (this.userRole === 'support') {
      updateUrl = `http://localhost:3000/api/tickets/support/${this.route.snapshot.paramMap.get('id')}`;
    }

    if (updateUrl) {
      this.http.put<any>(updateUrl, this.ticket, { withCredentials: true }).subscribe({
        next: (response) => {
          console.log('Ticket updated successfully:', response);
          this.router.navigate(['/']); // Redirect to home page after updating
        },
        error: (err) => {
          console.error('Failed to update ticket:', err);
        }
      });
    }
  }
}
