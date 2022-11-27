import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Task} from '../models/Task';
import { TaskList } from '../models/TaskList';

@Injectable({
    providedIn: 'root'
  })
export class TaskService{

    private baseURL = "http://localhost:8080/api/v1/task";
    private baseURLForTaskById = "http://localhost:8080/api/v1/tasklist";
    private baseURLForTaskDescription = "http://localhost:8080/api/v1/taskDescription";
    constructor(private httpClient: HttpClient) {
    }

    getTask(tasklistId : number): Observable<Task[]>{
        return this.httpClient.get<Task[]>(`${this.baseURL}/${tasklistId}`);
    }

    createTask(task : Task): Observable<Task>{
        console.log(task.taskList.id)
    return this.httpClient.post<Task>(`${this.baseURL}`, task);
    }
   updateTask(task:any):Observable<Object>{
    return this.httpClient.put(`${this.baseURL}`,task);
   }
   updateTaskDescription(taskId:string,task:Task):Observable<Object>{

    return this.httpClient.put(`${this.baseURLForTaskDescription}/${taskId}`,task);
  }
    deleteTask(taskId:number):Observable<Object>{
      return this.httpClient.delete(`${this.baseURL}/${taskId}`);
    }
    selectTaskByUserId(userId : number):Observable<Task[]>{
      return this.httpClient.get<Task[]>(`${this.baseURL}/generateTaskByUserId/${userId}`);
    }

    getTaskListById(taskListid : number):Observable<TaskList>{
      return this.httpClient.get<TaskList>(`${this.baseURLForTaskById}/${taskListid}`);
    }
    updateTaskList(taskId:string,task:Task):Observable<Object>{
      return this.httpClient.put(`${this.baseURL}/edit/${taskId}`,task);
    }
    updateTaskListToDone(taskId:number,task:Task):Observable<Object>{
      return this.httpClient.put(`${this.baseURL}/editTaskList/${taskId}`,task);
    }
}
