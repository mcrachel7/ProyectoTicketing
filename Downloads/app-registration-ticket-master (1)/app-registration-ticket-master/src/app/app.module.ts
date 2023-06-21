import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

import { CreateTicketComponent } from './modules/ticket/components/create-ticket/create-ticket.component';
import { ListTicketsComponent } from './modules/ticket/components/list-tickets/list-tickets.component';
import { HttpClientModule } from '@angular/common/http';
import { AdminTicketsComponent } from './modules/ticket/components/admin-tickets/admin-tickets.component';
import { TicketTemplateComponent } from './modules/shared/components/ticket-template/ticket-template.component';

import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    CreateTicketComponent,
    ListTicketsComponent,
    AdminTicketsComponent,
    TicketTemplateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
