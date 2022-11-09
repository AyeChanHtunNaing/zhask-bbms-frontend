import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { user } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseURL = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  login(user:user){
    window.sessionStorage.setItem("loginuser",JSON.stringify(user));
    return this.http.get(`${this.baseURL}/`, { observe: 'response',withCredentials: true });
  }

  addUser(usr : user ):Observable<user>{
    return this.http.post<user>(`${this.baseURL}/signup`,usr);
  }

  forgotPsw(usr : user ):Observable<boolean>{
    return this.http.post<boolean>(`${this.baseURL}/forgot_psw`,usr);
  }

  resetPsw(usr : user ):Observable<boolean>{
    return this.http.post<boolean>(`${this.baseURL}/reset_psw`,usr);
  }
}
