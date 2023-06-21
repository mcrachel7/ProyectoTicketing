import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../services/ticket.service';
import { LoginService } from 'src/app/modules/auth/services/login/login.service';
import { ITicket } from 'src/app/core/interfaces/Ticket/iticket';
import { TicketTemplateComponent } from 'src/app/modules/shared/components/ticket-template/ticket-template.component';
import { Router } from '@angular/router';

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

  constructor(
    private ticketService: TicketService,
    private loginService: LoginService,
    private router:Router
    ) { }

  ngOnInit(): void {
    this.initDataUser();    
  }
  async initDataUser(){
    await this.loadUserData();
    await this.validateLoginData();
    await this.listTickets();
  }

  async loadUserData(){
    if( (this.idUser == "" || this.idUser == undefined) || (this.token == "" || this.token == undefined) ){
      this.idUser = await this.loginService.getIdUser();
      this.token = await this.loginService.getToken();
    }
  }

  async validateLoginData(){
    if( (this.idUser == "" || this.idUser == undefined) || (this.token == "" || this.token == undefined)){
      this.router.navigate(['auth']);
    }    
  }

  async listTickets() {    
    let response = await this.ticketService.viewTicket(this.idUser, this.token).subscribe(res => {
      if(res && res.length > 0){
        this.fillArrayTicket(res);
        this.flagLoadTasks = true;
      }
    }, 
    err => {      
      console.log(err.message);
    });
  }

  fillArrayTicket(dataRes: any) {

    this.listTicket = [];
    dataRes.forEach((element: any) => {      
      this.listTicket.push({
        _id: element._id,
        title: element.title,
        description: element.description,
        status: element.status,
        type: element.type,
        idUser: element.idUser,
        createdAt: element.createdAt,
        department: element.department,
        fullName: element.fullName
      });
    });
  }

}
