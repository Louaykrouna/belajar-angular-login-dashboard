import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { UserTableRoutingModule } from './user-table-routing.module';
import { UserTableComponent } from './user-table.component';


@NgModule({
  declarations: [
    UserTableComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    UserTableRoutingModule,
    NgbTypeaheadModule,
    FontAwesomeModule
  ]
})
export class UserTableModule { }
