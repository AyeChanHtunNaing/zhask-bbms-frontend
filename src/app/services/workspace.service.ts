import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Workspace } from '../models/workspace';
@Injectable({
    providedIn: 'root'
  })
export class WorkspaceService {
    private baseURL = "http://localhost:8080/api/v1/workspace";
    private favURL="http://localhost:8080/api/v1/favorite"
    constructor(private httpClient: HttpClient) {

    }
      getWorkspace(userId:number): Observable<Workspace[]>{
        return this.httpClient.get<Workspace[]>(`${this.baseURL}/${userId}`);
      }
      getWorkspaceByWorkspaceId(workspaceId:number): Observable<Workspace>{
        return this.httpClient.get<Workspace>(`${this.baseURL}/getWorkspace/${workspaceId}`);
      }
      getFavWorkspace(userId:number): Observable<Workspace[]>{
      return this.httpClient.get<Workspace[]>(`${this.favURL}/workspace/${userId}`);
     }
     setFavWorkspace(workspaceId: string,workspace : Workspace):Observable<Workspace> {
       return this.httpClient.put<Workspace>(`${this.favURL}/workspace/${workspaceId}`,workspace);
     }
      createWorkspace(workspace:Workspace): Observable<Object>{
        return this.httpClient.post(`${this.baseURL}`, workspace);
      }
      getWorkspaceById(userId: number): Observable<Workspace>{
        return this.httpClient.get<Workspace>(`${this.baseURL}/${userId}`);
      }

      updateWorkspaceById(workspaceId: string,workspace : Workspace):Observable<Workspace>{
        return this.httpClient.put<Workspace>(`${this.baseURL}/${workspaceId}`,workspace);
      }

      deleteWorkspaceById(workspaceId: number):Observable<Workspace>{
        return this.httpClient.delete<Workspace>(`${this.baseURL}/${workspaceId}`);
      }
}
