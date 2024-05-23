import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { ChatService } from '../services/chatService';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router'; // Add this import
import { FeedbackComponent } from '../feedback/feedback.component';

@Component({
  selector: 'app-messengerie',
  templateUrl: './messengerie.component.html',
  providers:[ChatService],
  styleUrls: ['./messengerie.component.css']
})
export class MessengerieComponent implements OnInit,OnDestroy {
  private messagesSubscription: Subscription=new Subscription();
  messages: any[] = [];
  newMessage: string = '';
  senderId: string | null=null;
  receiverId: string | null=null;
  userId: string | null = null; // Add userId variable
  userData: any = {};
  chatId: string | null = null;
  ticketId: string | null = null;
  supportId: string | null = null;
  chatDetails: any = {};
  ticketDetails: any = {};
  userRole: string | null = null; // Initialize it here
  chatWith: string | null = null; // Initialize it here
  showFeedback = false;

  constructor(private http: HttpClient, private route: ActivatedRoute,private chatService: ChatService, private router: Router) {}

  
  ngOnInit() {
    const userDataStr = localStorage.getItem('userData');
    if (userDataStr) {
      this.userData = JSON.parse(userDataStr);
      this.senderId = this.userData._id;
      this.userRole = this.userData.role; // Set userRole from userData

    }
    this.route.paramMap.subscribe(params => {
      this.chatId = params.get('id');
      this.chatService.joinRoom(params.get('id'));
      if (this.chatId) {
        this.messagesSubscription = this.chatService.getMessages().subscribe((data: any) => {
          console.log(`Component received message: ${data.message}`);
          this.messages.push(data);
        })
        this.fetchChatDetails()
        this.fetchMessages();
      }
    });
    this.fetchMessages()
  }
  ngOnDestroy() {
    this.chatService.leaveRoom(this.chatId);
    if (this.messagesSubscription) {
      this.messagesSubscription.unsubscribe();
    }
    this.chatService.disconnect();
    this.router.navigate(['/dashboard']);

  }
  handleShowFeedback(){
    this.showFeedback=true;
  }
  fetchTicketDetails(ticketId: string) {
    this.http.get<any>(`http://localhost:3000/api/tickets/${ticketId}`,{withCredentials:true}).subscribe({
      next: (ticket) => {
        console.log('Ticket details fetched successfully:', ticket);
        this.receiverId = ticket.support_id;
        this.ticketDetails = ticket;
        this.fetchMessages();
      },
      error: (err) => {
        console.error('Failed to fetch ticket details:', err);
      }
    });
  }
  fetchMessages() {
    // if (!this.senderId || !this.receiverId) {
    //   console.error('Missing senderId or receiverId');
    //   return;
    // }

    this.http.get<any[]>(`http://localhost:3000/api/chat/${this.chatId}/messages`,{ withCredentials: true }).subscribe({
      next: (response) => {
        console.log('Messages fetched successfully:', response);
        this.messages = response;
      },
      error: (err) => {
        console.error('Failed to fetch messages:', err);
      }
    });
  }
  fetchChatDetails() {
    // if (!this.senderId || !this.receiverId) {
    //   console.error('Missing senderId or receiverId');
    //   return;
    // }

    this.http.get<any>(`http://localhost:3000/api/chat/${this.chatId}`,{ withCredentials: true }).subscribe({
      next: (response) => {
        console.log('Messages fetched successfully:', response);
        this.fetchTicketDetails(response.ticket_id);
        this.chatDetails = response;
        this.chatWith = this.userData._id==response.sender_id? response.receiverDetails.username : response.senderDetails.username;
      },
      error: (err) => {
        console.error('Failed to fetch messages:', err);
      }
    });
  }

  sendMessage() {
    if (this.newMessage.trim() === '') {
      console.error('Cannot send an empty message');
      return;
    }
    this.chatService.sendMessage(this.chatId,{
      "sender_id": this.senderId,
      "receiver_id":this.ticketDetails.createdBy==this.senderId? this.ticketDetails.support_id : this.ticketDetails.createdBy,
      "message": this.newMessage
    });
    this.http.post<any>(`http://localhost:3000/api/chat/${this.chatId}/send`, {
      "sender_id": this.senderId,
      "receiver_id":this.ticketDetails.createdBy==this.senderId? this.ticketDetails.support_id : this.ticketDetails.createdBy,
      "message": this.newMessage
    },{ withCredentials: true }).subscribe({
      next: (response) => {
        console.log('Message sent successfully:', response);
        this.newMessage = '';
        this.fetchMessages();
      },
      error: (err) => {
        console.error('Failed to send message:', err);
      }
    });
  }
  
}
