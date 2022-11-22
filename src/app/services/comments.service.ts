import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommentInterface } from '../types/comment.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class CommentsService {
  constructor(private httpClient: HttpClient) { 
      
  }
  private baseURL = "http://localhost:8080/api/v1/comment";
  getComments(taskId:number): Observable<CommentInterface[]> {
    return this.httpClient.get<CommentInterface[]>(`${this.baseURL}/${taskId}`)
  }

  createComment(comment:CommentInterface ): Observable<CommentInterface> {
    return this.httpClient.post<CommentInterface>(`${this.baseURL}`, comment);
  }

  updateComment(comment:CommentInterface): Observable<CommentInterface> {
    return this.httpClient.put<CommentInterface>(
      `${this.baseURL}`,comment
    );
  }

  deleteComment(id: string): Observable<{}> {
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }
}
