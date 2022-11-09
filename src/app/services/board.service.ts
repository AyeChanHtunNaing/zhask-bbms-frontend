import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Workspace } from '../models/workspace';
import { Board } from '../models/board';
@Injectable({
    providedIn: 'root'
  })
export class BoardService {
    private baseURL = "http://localhost:8080/api/v1/board";
    private baseURLForTaskByBoardId = "http://localhost:8080/api/v1/showalltaskbyboard";

    constructor(private httpClient: HttpClient) { 
    
    }
    
    getBoard(workspaceId : number): Observable<Board[]>{
        return this.httpClient.get<Board[]>(`${this.baseURL}/${workspaceId}`);
      }
    
    createBoard(board : Board): Observable<Object>{
        return this.httpClient.post(`${this.baseURL}`, board);
      }
    getWorkspaceById(userId : string): Observable<Workspace>{
        return this.httpClient.get<Workspace>(`${this.baseURL}/${userId}`);
      }
    getTaskByBoardId(boardId : number):Observable<Task[]>{
      return this.httpClient.get<Task[]>(`${this.baseURLForTaskByBoardId}/${boardId}`);
    }
      
    updateBoardById(boardId: string,board : Board):Observable<Board>{
      return this.httpClient.put<Board>(`${this.baseURL}/${boardId}`,board);
    }

    deleteBoardById(boardId: number):Observable<Board>{
      return this.httpClient.delete<Board>(`${this.baseURL}/${boardId}`);
    }
}