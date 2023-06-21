import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ITicket } from 'src/app/core/interfaces/Ticket/iticket';

@Injectable({
  providedIn: 'root'
})
export class TicketTemplateService {

  public AUTH_SERVER:string = "http://localhost:3000/tickets";
  public idUser:string = "";

  public header = new HttpHeaders();

  constructor(
    private httpClient:HttpClient
  ) { }

  editStatusTicket(id_ticket:any, new_status:string, token:string): Observable<any>{

    this.header = this.header
    .set('Authorization', token)
    .set('content-type','application/json')
    .set('Access-Control-Allow-Origin', '*');

    return this.httpClient.put<any>(
      this.AUTH_SERVER+"/editTicket/"+id_ticket, {status:new_status}, {headers:this.header}
    ).pipe(tap(
        (res) => {
          if(res){
            //operaciones adicionales a contemplar a futuro.            
          }
        })
      );
  }  

}
