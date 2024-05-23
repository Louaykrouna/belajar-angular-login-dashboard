import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { EditTicketComponent } from '../edit-ticket/edit-ticket.component'; // Import EditTicketComponent


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', loadChildren: () => import('../welcome/welcome.module').then(m => m.WelcomeModule) },
      { path: 'user', loadChildren: () => import('../user-table/user-table.module').then(m => m.UserTableModule) },
      { path: '**', loadChildren: () => import('../not-found/not-found.module').then(m => m.NotFoundModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
