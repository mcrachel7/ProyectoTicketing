import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MainContentService {

  public AUTH_SERVER:string = "http://localhost:3000/tickets";
  public token:string = "";
  public idUser:string = "";
  public role:string = "";

  public dataDashboard!:any;
  public header = new HttpHeaders();

  constructor(
    private httpClient:HttpClient
  ) { }

  public getToken():string{
    if(!this.token){
      this.token = localStorage.getItem("ACCESS_TOKEN") || "";    
    }
    return this.token;
  }

  public getIdUser():string{
    if(!this.idUser){
      this.idUser = localStorage.getItem("ID_USER") || "";    
    }
    return this.idUser;
  }

  public getRoleUser():string{
    if(!this.role){
      this.role = localStorage.getItem("ROLE_USER") || "";    
    }
    return this.role;
  }

  public logOut(){

    this.idUser = "";
    this.role = "";
    this.token = "";

    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('ID_USER');
    localStorage.removeItem('ROLE_USER');
  }

  getDataDashboard(): Observable<any>{

    this.header = this.header
    .set('Authorization', this.token)
    .set('content-type','application/json')
    .set('Access-Control-Allow-Origin', '*');

    return this.httpClient.get<any>(
      this.AUTH_SERVER+"/data-dashboard", {headers:this.header}
    ).pipe(tap(
        (res) => {
          if(res){
            //operaciones adicionales a contemplar a futuro.            
          }
        })
      );

  }

}
