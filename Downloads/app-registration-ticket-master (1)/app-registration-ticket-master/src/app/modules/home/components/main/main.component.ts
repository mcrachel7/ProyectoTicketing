import { Component, OnInit } from '@angular/core';
import { MainContentService } from '../../services/main-content/main-content.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit{

  public idUser:string = "";
  public role:string = "";
  public token:string = "";

  constructor(
    private mainContentService: MainContentService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.loadUserData();
  }

  async loadUserData(){
    this.idUser = await this.mainContentService.getIdUser();
    this.role = await this.mainContentService.getRoleUser();
    this.token = await this.mainContentService.getToken();
    console.log(this.role);

  }

  createTicket(){
    this.router.navigate(['/create-ticket']);
  }
  viewHistory(){
    this.router.navigate(['/view-ticket']);
  }
  adminTickets(){
    this.router.navigate(['/list-tickets']);
  }
  home(){
    this.router.navigate(['home']);
  }
  logOut(){
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('ID_USER');
    localStorage.removeItem('ROLE_USER');
    this.router.navigate(['auth']);
  }





}
