import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';

import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import { UserObjType } from '../type/type-interfaces';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit, OnDestroy {
  users: UserObjType[];
  varSub!: null | Subscription;
  users$;

  userFilter$!: Observable<UserObjType[]>;
  varSubFilter!: null | Subscription;
	filter;

  faMagnifyingGlass;

  constructor(private http: HttpClient) {
    this.users = [];
    this.users$ = this.http.get<UserObjType[]>('/assets/user-data.json');
    this.filter = new FormControl('', { nonNullable: true });
    this.faMagnifyingGlass = faMagnifyingGlass;
  }
  search(text: string): UserObjType[] {
    return this.users.filter((user) => {
      const term = text.toLowerCase();
      return (
        user.name.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term)
      );
    });
  }
  ngOnInit(): void {
    this.varSub = this.users$.subscribe({
      next: (response) => {
        this.users = response;
      },
      error: (err) => {
        console.log(err.message);
      },
      complete: () => {
        this.userFilter$ = this.filter.valueChanges.pipe(
          startWith(''),
          map((text) => this.search(text)),
        );
      }
    });
  }
  ngOnDestroy(): void {
    if (this.varSub) this.varSub.unsubscribe();
  }
}
