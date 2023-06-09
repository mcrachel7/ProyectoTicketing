import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListTicketsComponent } from './modules/ticket/components/list-tickets/list-tickets.component';
import { CreateTicketComponent } from './modules/ticket/components/create-ticket/create-ticket.component';
import { AdminTicketsComponent } from './modules/ticket/components/admin-tickets/admin-tickets.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(auth => auth.AuthModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./modules/home/home.module').then(auth => auth.HomeModule)
  },
  {
    path: 'view-ticket', component: ListTicketsComponent
  },
  {
    path: 'create-ticket', component: CreateTicketComponent
  },
  {
    path: 'list-tickets', component:AdminTicketsComponent
  },
  {
    path: 'editTicket/:id', component: CreateTicketComponent
  },
  {
    path:'',
    pathMatch: 'prefix',
    redirectTo: 'auth'
},
{
    path: '**',
    pathMatch: 'prefix',
    redirectTo: 'auth'
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
