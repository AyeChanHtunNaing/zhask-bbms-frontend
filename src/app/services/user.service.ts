import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  rememberme!: boolean
  private baseURL = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  login(user:User):Observable<User>{
    window.sessionStorage.setItem("loginuser",JSON.stringify(user));
    // this.rememberme=true;
    // let headers = new HttpHeaders();
    // headers = headers.append('Authorization', 'Basic ' + btoa(user.name + ':' + user.password));
    // headers = headers.append('X-Requested-With', 'XMLHttpRequest'); // to suppress 401 browser popup

    // const params = new HttpParams().append('remember-me', (this.rememberme ? 'true' : 'false' ));
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

  logout():Observable<Object>{
    return this.http.get(`${this.baseURL}/temp_logout`);
  }

  getUserNameByUserId(userId : number):Observable<User>{
    return this.http.get<User>(`${this.baseURL}/showUserNameByUserId/${userId}`);
  }

  updateUserByUserId(user : User):Observable<boolean>{
    return this.http.put<boolean>(`${this.baseURL}/updateprofile`,user);
  }
}
