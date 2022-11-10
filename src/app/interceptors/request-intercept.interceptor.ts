import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable()
export class RequestInterceptInterceptor implements HttpInterceptor {

  User = new User();
  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
  this.User = JSON.parse(window.sessionStorage.getItem('loginuser') || '{}');

    let  Authorization:any ;
    if(this.User && this.User.password && this.User.email){
      Authorization = 'Basic ' + window.btoa(this.User.email + ':' + this.User.password);
      window.sessionStorage.removeItem('loginuser');
    }


    let auth = JSON.parse(window.sessionStorage.getItem('Authorization') || 'null')
      if (auth) {
      Authorization = auth;
      window.sessionStorage.removeItem('Authorization');
     }

     if((this.User && this.User.email && this.User.password) || (auth)){

      const req = request.clone(
      {
        setHeaders:{
          Authorization
        }
      ,
       headers: request.headers.set('X-Requested-With', 'XMLHttpRequest')
    });

  return next.handle(req);
  }
    return next.handle(request);
  }
}
