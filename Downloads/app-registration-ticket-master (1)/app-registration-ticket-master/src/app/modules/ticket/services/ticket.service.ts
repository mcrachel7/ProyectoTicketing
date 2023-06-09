import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Ticket } from '../models/ticket';
import { Observable } from 'rxjs';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  public AUTH_SERVER: string= "http://localhost:3000/tickets"
  public idUser:string = "";
  public header = new HttpHeaders();

  constructor(private httpClient:HttpClient) { }

  createTicket(objTicket:Ticket, token:string): Observable<any>{

    this.header = this.header
    .set('Authorization', token)
    .set('content-type','application/json')
    .set('Access-Control-Allow-Origin', '*');

  return this.httpClient.post<any>(this.AUTH_SERVER+"/new-ticket", objTicket, {headers:this.header})
  .pipe(tap(
    (res) => {
      console.log(res);
      if(res){

        this.saveToken(res.token);
      }
    })
  );
}

loadTickets():Observable<any>{
  return this.httpClient.get(this.AUTH_SERVER+"/list-tickets")

}


obtainTicket(id: string): Observable<any>
{
  return this.httpClient.get(this.AUTH_SERVER + "/obtainTicket" +id)
}


viewTicket(idUser:string, token:string): Observable<any>{

  this.header = this.header
  .set('Authorization', token)
  .set('content-type','application/json')
  .set('Access-Control-Allow-Origin', '*');

  return this.httpClient.get<any>(this.AUTH_SERVER+"/view-ticket?idUser="+idUser, {headers:this.header})
  .pipe(tap(
    (res) => {
      console.log(res);
      if(res){
        this.saveToken(res.token);
      }
    })
  );
}

  private saveToken(token:string){
    localStorage.setItem("ACCESS_TOKEN", token);
  }

  public getToken():string{
    return localStorage.getItem("ACCESS_TOKEN") || "";
  }

}
