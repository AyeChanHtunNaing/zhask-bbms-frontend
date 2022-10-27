import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Task} from '../models/Task';

@Injectable({
    providedIn: 'root'
  })
export class TaskService{

    private baseURL = "http://localhost:8080/api/v1/task";
    constructor(private httpClient: HttpClient) {    
    }

    getTask(tasklistId : number): Observable<Task[]>{
        return this.httpClient.get<Task[]>(`${this.baseURL}/${tasklistId}`);
    }
    
    createTask(task : Task): Observable<Object>{
        console.log(task.taskList.id)
    return this.httpClient.post(`${this.baseURL}`, task);
    }
   updateTask(taskId:string,task:Task):Observable<Object>
   {
    return this.httpClient.put(`${this.baseURL}/${taskId}`,task)
   }
}