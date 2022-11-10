import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseURL = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  login(user:User):Observable<User>{
    window.sessionStorage.setItem("loginuser",JSON.stringify(user));
    return this.http.get<User>(`${this.baseURL}/`);
  }

  addUser(usr : User ):Observable<User>{
    return this.http.post<User>(`${this.baseURL}/signup`,usr);
  }

  forgotPsw(usr : User ):Observable<boolean>{
    return this.http.post<boolean>(`${this.baseURL}/forgot_psw`,usr);
  }

  resetPsw(usr : User ):Observable<boolean>{
    return this.http.post<boolean>(`${this.baseURL}/reset_psw`,usr);
  }
}
