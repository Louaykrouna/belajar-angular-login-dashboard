import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbHighlight } from '@ng-bootstrap/ng-bootstrap';

import { Observable, Subscription } from 'rxjs';
import { debounceTime, map, startWith } from 'rxjs/operators';

import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule here

import { UserObjType } from '../type/type-interfaces';

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbHighlight,ReactiveFormsModule],
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit, OnDestroy {
  users: UserObjType[];
  varSub: Subscription | null = null;
  users$: Observable<UserObjType[]> = new Observable<UserObjType[]>();
  userFilter$: Observable<UserObjType[]> = new Observable<UserObjType[]>();
  filter = new FormControl('', { nonNullable: true });
  faMagnifyingGlass = faMagnifyingGlass;
  newUser: UserObjType = { username: '', email: '', password: '', role: 'user' };

  constructor(private http: HttpClient) {
    this.users = [];
    this.users$ = new Observable<UserObjType[]>();
    this.userFilter$ = new Observable<UserObjType[]>();
  }

  ngOnInit(): void {
    this.loadUsers();
    this.initializeFilter();
  }

  loadUsers(): void {
    this.users$ = this.http.get<UserObjType[]>('http://localhost:3000/api/allusers', { withCredentials: true });
    this.varSub = this.users$.subscribe({
      next: (response) => {
        console.log('Fetched users:', response); // Log response
        this.users = response;
      },
      error: (err) => {
        console.error('Error fetching users:', err.message);
      }
    });
  }
  

  initializeFilter(): void {
    this.userFilter$ = this.filter.valueChanges.pipe(
      startWith(''),
      debounceTime(100),
      map((text) => this.search(text))
    );
  }
  
  search(text: string): UserObjType[] {
    const term = text.toLowerCase();
    return this.users.filter((user) =>
      user.username.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term) ||
      user.role.toLowerCase().includes(term)
    );
  }

  generatePassword(): void {
    const randomPassword = Math.random().toString(36).slice(-8);
    this.newUser.password = randomPassword;
  }

  addUser(userData: UserObjType): void {
    this.http.post<UserObjType>('http://localhost:3000/create', userData, { withCredentials: true }).subscribe({
      next: (response) => {
        console.log('User added:', response);
        this.newUser = { username: '', email: '', password: '', role: 'user' }; // Reset the form
        this.loadUsers(); // Reload users list to include the new user
        this.initializeFilter();
      },
      error: (error) => console.error('Error adding user:', error)
    });
  }

  deleteUser(id: string | undefined): void {
    if (!id) {
      console.error('Invalid user id');
      return;
    }
    this.http.delete(`http://localhost:3000/api/user/delete/${id}`, { withCredentials: true }).subscribe({
      next: () => {
        this.users = this.users.filter(user => user._id !== id);
        this.initializeFilter(); // Reinitialize filter to update list
      },
      error: (err) => {
        console.error('Error deleting user:', err.message);
      }
    });
  }
  

  ngOnDestroy(): void {
    if (this.varSub) {
      this.varSub.unsubscribe();
    }
  }
}
