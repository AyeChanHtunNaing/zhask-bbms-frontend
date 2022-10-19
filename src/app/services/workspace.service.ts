import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Workspace } from '../models/workspace';
@Injectable({
    providedIn: 'root'
  })
export class WorkspaceService {
    private baseURL = "http://localhost:8080/api/v1/workspace";
    constructor(private httpClient: HttpClient) { 
    
    }
    getWorkspace(): Observable<Workspace[]>{
        return this.httpClient.get<Workspace[]>(`${this.baseURL}`);
      }
    
      createWorkspace(workspace:Workspace): Observable<Object>{
        return this.httpClient.post(`${this.baseURL}`, workspace);
      }
      getWorkspaceById(userId: string): Observable<Workspace>{
        return this.httpClient.get<Workspace>(`${this.baseURL}/${userId}`);
      }
}
