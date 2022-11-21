import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Activity} from "../models/activity";
import {Board} from "../models/board";

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private baseURL = "http://localhost:8080/api/v1/activity";
  constructor(private httpClient: HttpClient) { }
  createActivity(activity : Activity): Observable<Object>{
    console.log("reach");

    return this.httpClient.post(`${this.baseURL}`, activity);
  }
  getAllActivities(taskId : number):Observable<Activity[]>{
    return this.httpClient.get<Activity[]>(`${this.baseURL}/${taskId}`);
  }
  setActivity(activityId: number,activity : Activity):Observable<Activity>{
    return this.httpClient.put<Activity>(`${this.baseURL}/${activityId}`,activity);
  }
  setTaskList(taskId: number,activity : Activity):Observable<Activity>{
    return this.httpClient.put<Activity>(`${this.baseURL}/taskList/${taskId}`,activity);
  }
}
