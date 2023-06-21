import { Component, Input, OnInit } from '@angular/core';
import { ITicket } from 'src/app/core/interfaces/Ticket/iticket';

import { TicketTemplateService } from '../../services/ticket-template/ticket-template.service'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ticket-template',
  templateUrl: './ticket-template.component.html',
  styleUrls: ['./ticket-template.component.scss']
})
export class TicketTemplateComponent implements OnInit{
  
  @Input() ticket!:ITicket;

  private token!:string;

  public flagSelectStatus:boolean = false;
  public newStatusTicket!:string;
  public selectStatusOptions!:string[];
  
  constructor (
    private ticketTemplateService: TicketTemplateService,
  ){ }

  ngOnInit(): void {
    this.initDataTicket();
  }

  fillSelectStatus(){
    this.selectStatusOptions = [
      'Disponible','Activo', 'Abierto',
      'En desarrollo', 'En proceso', 'En gestion',
      'Desaprobado', 'Denegado', 'Cerrado',
      'Deshabilitado', 'Inactivo'
    ];
  }

  async initDataTicket(){    
    this.token = await localStorage.getItem("ACCESS_TOKEN") || "";
    await this.fillSelectStatus();
    this.newStatusTicket = await this.ticket.status;
  }

  getColorClass(): string{
    if (this.ticket.status == "Disponible" || this.ticket.status == "Activo" || this.ticket.status == "Abierto") return "text-success";
    if (this.ticket.status == "En desarrollo" || this.ticket.status == "En proceso" || this.ticket.status == "En gestion") return "text-in-management";
    if (this.ticket.status == "Desaprobado" || this.ticket.status == "Denegado") return "text-failure";
    if (this.ticket.status == "Deshabilitado" || this.ticket.status == "Inactivo" || this.ticket.status == "Cerrado") return "text-inactive";  
    return "text-in-management";
  }

  enableStatusTicket(){
    this.flagSelectStatus = true;    
  }

  async changeStatusTicket(){

    this.ticket.status = await this.newStatusTicket;
    console.log(this.ticket._id);

    let responseEditStatusTicket = await this.ticketTemplateService.editStatusTicket(this.ticket._id, this.ticket.status, this.token).subscribe(res => {
      Swal.fire({
        title: 'Resultado de la peticion.',
        text: 'Status del ticket cambiado exitosamente',
        icon: 'success'
      });
      this.ticket.status = this.newStatusTicket;
    }, err => {
      Swal.fire({
        title: 'Algo ha ocurrido.',
        text: 'Se presento un problema en la comunicacion y/o peticion realizada al servidor al actualizar el ticket.',
        icon: 'warning'
      });
    });
    this.newStatusTicket = this.ticket.status;
    this.flagSelectStatus = false;
  }

  async deleteTicket(){

  }

}
