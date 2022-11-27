import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Activity} from "../models/activity";
import {Observable} from "rxjs";
import {Logs} from "../models/logs";
import { NotiEmail } from '../models/notiemail';

@Injectable({
  providedIn: 'root'
})
export class NotiEmailService {
  private baseURL = "http://localhost:8080/api/v1/notiemail";
  constructor(private httpClient: HttpClient) { }
  sendNotiEmail(name:string,notiemail:NotiEmail[]): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}/${name}`, notiemail);
  }
 
}
