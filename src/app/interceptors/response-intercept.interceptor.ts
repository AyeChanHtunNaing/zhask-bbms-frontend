import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class ResponseInterceptInterceptor implements HttpInterceptor {

  constructor(private router:Router) {

  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
   
    return next.handle(request).pipe(
      map(
      (res) => {
       if(res instanceof HttpResponse){
        if(res.headers.get('Authorization')){
       sessionStorage.setItem('Authorization',JSON.stringify(res.headers.get('Authorization')));
        }
      }
       return res;
      }
      ));
  }
}
