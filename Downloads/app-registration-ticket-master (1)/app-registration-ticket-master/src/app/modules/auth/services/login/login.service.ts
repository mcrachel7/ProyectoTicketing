import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public AUTH_SERVER:string = "http://localhost:3000/api";
  public token:string = "";
  public idUser:string = "";

  constructor(
    private httpClient:HttpClient
  ) { }

  loginUser(user: any): Observable<any>{
    return this.httpClient.post<any>(
      this.AUTH_SERVER+"/login", user
    ).pipe(tap(
        (res) => {
          console.log(res);
          if(res){
            //guardar token
            this.saveDataLogin(res.token, res.id_user, res.role);
          }
        })
      );
  }
  
  logOut(){
    this.token = "";
    this.idUser = "";
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("ID_USER");   
  }

  private saveDataLogin(token:string, idUser:string, role:string){
    localStorage.setItem("ACCESS_TOKEN", token);
    localStorage.setItem("ID_USER", idUser);
    localStorage.setItem("ROLE_USER", role);
  } 

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

}
