import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../services/ticket.service';
import { LoginService } from 'src/app/modules/auth/services/login/login.service';
import { ITicket } from 'src/app/core/interfaces/Ticket/iticket';
import { TicketTemplateComponent } from 'src/app/modules/shared/components/ticket-template/ticket-template.component';

@Component({
  selector: 'app-list-tickets',
  templateUrl: './list-tickets.component.html',
  styleUrls: ['./list-tickets.component.scss']
})
export class ListTicketsComponent implements OnInit {

  public listTicket!: ITicket[];
  private idUser!: string;
  private token!: string;
  public flagLoadTasks: boolean = false;

  constructor(private ticketService: TicketService,
    private loginService: LoginService) { }

  ngOnInit(): void {
    this.listTickets();
    this.fillFakeDataTicket();
  }

  listTickets() {
    this.idUser = this.loginService.getIdUser();
    this.token = this.loginService.getToken();
    this.ticketService.viewTicket(this.idUser, this.token).subscribe(res => {
      if (res.length > 0) {
        this.fillArrayTicket(res);
        this.flagLoadTasks = true;
      }
    });
  }

  fillFakeDataTicket(){
    this.listTicket = [];
    this.listTicket.push({
      title: "Titulo fake",
      description: "Descripcion fake",
      status: "disponible",
      type: "Computo",
      createdAt: "Wed 08 Jun 2023",
      department: "Sistemas"
    });
    this.listTicket.push({
      title: "Titulo fake",
      description: "Descripcion fake",
      status: "en gestion",
      type: "Computo",
      createdAt: "Wed 08 Jun 2023",
      department: "Sistemas"
    });
  }

  fillArrayTicket(dataRes: any) {
    dataRes.forEach((element: any) => {
      this.listTicket = [];
      this.listTicket.push({
        title: element.title,
        description: element.description,
        status: element.status,
        type: element.type,
        createdAt: element.createdAt,
        department: element.department
      });
    });
  }

}
