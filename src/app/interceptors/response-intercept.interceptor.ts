import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable()
export class ResponseInterceptInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      map(
      (res) => {
       if(res instanceof HttpResponse){
        if(res.headers.get('Authorization')){
       window.sessionStorage.setItem('Authorization',JSON.stringify(res.headers.get('Authorization')));
        }
      }
       return res;
      }
      ));
  }
}
