import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Comment } from '../models/comment';

@Injectable({
    providedIn: 'root'
  })
export class CommentService {

    private baseURL = "http://localhost:8080/api/v1/comment";

    constructor(private httpClient: HttpClient) { 
      
    }

    writeComment(comment:Comment): Observable<Object>{
        return this.httpClient.post(`${this.baseURL}`, comment);
    }

    getCommentByTaskId(id : number): Observable<Comment[]>{
        return this.httpClient.get<Comment[]>(`${this.baseURL}/${id}`);
    }
}
