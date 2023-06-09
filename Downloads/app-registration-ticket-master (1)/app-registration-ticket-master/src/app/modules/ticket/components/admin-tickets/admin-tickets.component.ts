import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../services/ticket.service';
import { Ticket } from '../../models/ticket';

@Component({
  selector: 'app-admin-tickets',
  templateUrl: './admin-tickets.component.html',
  styleUrls: ['./admin-tickets.component.scss']
})
export class AdminTicketsComponent implements OnInit{

  LISTTICKETS: Ticket[] = [];
  public flagLoadTasks:boolean = false;
  constructor(private _ticketService: TicketService){}

  ngOnInit(): void {
    this.loadTickets();
  }

  loadTickets(){

    this._ticketService.loadTickets().subscribe(res => {
     if(res.length>0){
      this.LISTTICKETS = res;
      this.flagLoadTasks= true;
     }
    }

    )
  }}
