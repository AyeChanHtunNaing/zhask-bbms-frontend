import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private baseURL = "http://localhost:8080/api/v1/report";
  constructor(private httpClient: HttpClient) { }
  exportWorkspace(id:number){
    return this.httpClient.get<any>(`${this.baseURL}/workspace/${id}`);
  }
  exportBoard(id:number){
    return this.httpClient.get<any>(`${this.baseURL}/board/${id}`);
  }
  exportAssignedTask(id:number){
    return this.httpClient.get<any>(`${this.baseURL}/assignedTask/${id}`);
  }
  exportEndTask(id:number){
    return this.httpClient.get<any>(`${this.baseURL}/endTask/${id}`);
  }
  exportClosedTask(id:number){
    return this.httpClient.get<any>(`${this.baseURL}/closedTask/${id}`);
  }
}
