import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // This makes the service globally available
})
export class ChatService {
  private socket: Socket;
  private readonly SERVER_URL = 'http://localhost:3000'; // Replace with your server URL

  constructor() {
    this.socket = io(this.SERVER_URL, {
      withCredentials: true,
      extraHeaders: {
        'my-custom-header': 'abcd'
      }
    });
  }

  joinRoom(roomId: string|null = null) {
    this.socket.emit('joinRoom', { roomId });
  }

  leaveRoom(roomId: string|null = null) {
    this.socket.emit('leaveRoom', { roomId });
  }

  sendMessage(roomId: string | null = null, message: any ) {
    console.log(`Sending message: ${message} to room: ${roomId}`);
    this.socket.emit('chat-msg', { roomId, message });
  }

  getMessages(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('eventChatMsg', (data) => {
        console.log(`Message received: ${data}`);
        observer.next(data);
      });
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}


// import { Injectable } from '@angular/core';
// import { BehaviorSubject, Observable } from 'rxjs';
// import { io } from "socket.io-client";


// @Injectable({
//   providedIn: 'root',
// })
// export class ChatService {

//   public message$: BehaviorSubject<string> = new BehaviorSubject('');
//   constructor() {}

//   socket = io('http://localhost:3000');
  
//   public sendMessage(message:any) {
//     this.socket.emit('chat-msg', message);
//   }

//   public getNewMessage = () => {
//     this.socket.on('chat-msg', (message) =>{
//         this.message$.next(message);
//     });
    
//     return this.message$.asObservable();
//   };
// }