import { Component, Input, OnInit } from '@angular/core';
import { ITicket } from 'src/app/core/interfaces/Ticket/iticket';

@Component({
  selector: 'app-ticket-template',
  templateUrl: './ticket-template.component.html',
  styleUrls: ['./ticket-template.component.scss']
})
export class TicketTemplateComponent implements OnInit{
  
  @Input() ticket!:ITicket;

  constructor (){ }

  ngOnInit(): void {
    
  }

  getColorClass(): string{
    if (this.ticket.status == "disponible" || this.ticket.status == "activo") return "text-success";
    if (this.ticket.status == "en desarrollo" || this.ticket.status == "en proceso" || this.ticket.status == "en gestion") return "text-in-management";
    if (this.ticket.status == "desaprobado" || this.ticket.status == "denegado") return "text-failure";
    if (this.ticket.status == "deshabilitado" || this.ticket.status == "inactivo") return "text-inactive";  
    return "text-in-management";
  }

  editStatusTicket(status:string){
    this.ticket.status = status;
  }

}
