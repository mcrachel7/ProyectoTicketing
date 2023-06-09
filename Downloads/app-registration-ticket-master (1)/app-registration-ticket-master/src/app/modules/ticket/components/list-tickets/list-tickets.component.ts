import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../services/ticket.service';
import { LoginService } from 'src/app/modules/auth/services/login/login.service';
import { Ticket } from '../../models/ticket';

@Component({
  selector: 'app-list-tickets',
  templateUrl: './list-tickets.component.html',
  styleUrls: ['./list-tickets.component.scss']
})
export class ListTicketsComponent implements OnInit{
  public listTicket: any= [];
  private idUser!:string;
  private token!:string;
  public flagLoadTasks:boolean = false;

  constructor(private ticketService: TicketService,
    private loginService: LoginService){}

  ngOnInit(): void {
    this.listTickets();
  }

  listTickets(){
    this.idUser = this.loginService.getIdUser();
    this.token = this.loginService.getToken();
    this.ticketService.viewTicket(this.idUser, this.token).subscribe(res => {
     if(res.length>0){
      this.listTicket = res;
      this.flagLoadTasks= true;
     }
    }

    )
    }

  fillArrayTicket(dataRes: any){
    dataRes.forEach((element: any )=> {
      this.listTicket.push({
        title: element.title,
        description: element.description,
        status: element.status,
        type: element.type
      });
    });
  }

}
