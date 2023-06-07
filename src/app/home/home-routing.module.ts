import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', loadChildren: () => import('../welcome/welcome.module').then(m => m.WelcomeModule) },
      { path: 'logout', loadChildren: () => import('../logout/logout.module').then(m => m.LogoutModule) },
      { path: '**', loadChildren: () => import('../not-found/not-found.module').then(m => m.NotFoundModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
