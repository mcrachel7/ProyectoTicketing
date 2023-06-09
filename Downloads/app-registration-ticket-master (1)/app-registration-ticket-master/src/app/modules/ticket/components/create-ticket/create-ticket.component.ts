import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ticket } from '../../models/ticket';
import { ActivatedRoute,Router } from '@angular/router';

import { TicketService } from '../../services/ticket.service';
import { LoginService } from 'src/app/modules/auth/services/login/login.service';
@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.scss']
})
export class CreateTicketComponent implements OnInit{
ticketForm: FormGroup;
id: string | null;


private token!:string;
  constructor(private fb: FormBuilder, private router: Router,
              private ticketService: TicketService,
              private loginService: LoginService,
              private aRouter: ActivatedRoute){
    this.ticketForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required],
      type: ['', Validators.required],
      FullName: ['', Validators.required],
      department: ['', Validators.required]
    })
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }
  ngOnInit(): void {
    this.isEdit();
  }

  redireccionar() {
    this.router.navigate(['/home']);
  }



  addTicket(){
    this.token = this.loginService.getToken();
    const TICKET: Ticket = {
      idUser : this.loginService.getIdUser(),
      title: this.ticketForm.get('title')?.value,
      description: this.ticketForm.get('description')?.value,
      status: this.ticketForm.get('status')?.value,
      type: this.ticketForm.get('type')?.value,
      FullName: this.ticketForm.get('FullName')?.value,
      department: this.ticketForm.get('department')?.value,
      createdAt: this.getDate()
    }

    this.ticketService.createTicket(TICKET, this.token).subscribe(res =>{
      console.log(TICKET);
      this.router.navigate(['view-ticket']);
    });
  }

  private getDate():string{
    let date: Date = new Date();
    return date.toDateString();
  }

  isEdit(){

    if(this.id !== null){
      this.ticketService.obtainTicket(this.id).subscribe(res =>{
        this.ticketForm.setValue({
          status: res.status
        })
      })
    }
  }

}

