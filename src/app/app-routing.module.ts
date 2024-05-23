import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketsComponent } from './tickets/tickets.component';
import { checkLoginGuard } from './guard/check-login.guard';
import { EditTicketComponent } from './edit-ticket/edit-ticket.component';
import { MessengerieComponent } from './messengerie/messengerie.component';

const routes: Routes = [
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: 'tickets/edit/:id', component: EditTicketComponent },
  
  { path: 'tickets', component: TicketsComponent },
  { path: 'chat/:id', component: MessengerieComponent },
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
    canActivate: [checkLoginGuard]
  },
   // Define the edit route with a parameter
  { path: '', redirectTo: '/tickets', pathMatch: 'full' }, // Redirect to tickets by default
  { path: '**', loadChildren: () => import('./not-found/not-found.module').then(m => m.NotFoundModule) }, // Wildcard route should be last
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
