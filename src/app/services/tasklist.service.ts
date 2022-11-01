import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { TaskList } from '../models/TaskList';

@Injectable({
    providedIn: 'root'
  })
export class TaskListService {
    private baseURL = "http://localhost:8080/api/v1/tasklist";
    constructor(private httpClient: HttpClient) {

    }
    getTaskList(boardId : number): Observable<TaskList[]>{
        return this.httpClient.get<TaskList[]>(`${this.baseURL}/${boardId}`);
      }

      createTaskList(tasklist : TaskList): Observable<Object>{
        return this.httpClient.post(`${this.baseURL}`, tasklist);
      }
      deleteTaskList(taskListId:number):Observable<Object>{
        return this.httpClient.delete(`${this.baseURL}/${taskListId}`);
      }
      // getTaskListById(boardId: number): Observable<TaskList>{
      //   return this.httpClient.get<TaskList>(`${this.baseURL}/${boardId}`);
      // }
}
