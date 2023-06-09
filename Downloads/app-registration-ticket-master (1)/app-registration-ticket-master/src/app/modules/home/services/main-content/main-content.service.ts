import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MainContentService {

  public AUTH_SERVER:string = "http://localhost:3000/api";
  public token:string = "";
  public idUser:string = "";
  public role:string = "";

  constructor() { }

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

}
