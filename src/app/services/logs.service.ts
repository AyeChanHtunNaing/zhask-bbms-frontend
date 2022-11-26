import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Activity} from "../models/activity";
import {Observable} from "rxjs";
import {Logs} from "../models/logs";

@Injectable({
  providedIn: 'root'
})
export class LogsService {
  private baseURL = "http://localhost:8080/api/v1/logs";
  constructor(private httpClient: HttpClient) { }
  createLogs(logs : Logs): Observable<Object>{
    console.log("reach");
    return this.httpClient.post(`${this.baseURL}`, logs);
  }
  getAllLogs(taskId : number):Observable<Logs[]>{
    return this.httpClient.get<Logs[]>(`${this.baseURL}/${taskId}`);
  }
}
