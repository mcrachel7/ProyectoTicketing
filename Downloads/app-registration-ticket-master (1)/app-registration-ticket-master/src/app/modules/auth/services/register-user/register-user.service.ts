import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

//import { JwtResponse } from '@core/models/interfaces/jwt-response';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  public AUTH_SERVER:string = "http://localhost:3000/api";
  public token:string = "";

  constructor(
    private httpClient:HttpClient
  ) { }

  registerUser(user: any): Observable<any>{
    return this.httpClient.post<any>(
      this.AUTH_SERVER+"/register", user
    ).pipe(tap(
        (res) => {
          if(res){
            console.log(res);
            //guardar token
            this.saveToken(res.token);
          }
        })
      );
  }

  private saveToken(token:string){
    localStorage.setItem("ACCESS_TOKEN", token);
  }

  private getToken():string{
    if(!this.token){
      this.token = localStorage.getItem("ACCESS_TOKEN") || "";    
    }
    return this.token;
  }

}
