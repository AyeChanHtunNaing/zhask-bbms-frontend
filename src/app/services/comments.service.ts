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
  getComments(): Observable<CommentInterface[]> {
    return this.httpClient.get<CommentInterface[]>(
      `http://localhost:3000/comments`
    );
  }

  createComment(comment:CommentInterface ): Observable<CommentInterface> {
    return this.httpClient.post<CommentInterface>(`${this.baseURL}`, comment);
  }

  updateComment(id: string, text: string): Observable<CommentInterface> {
    return this.httpClient.patch<CommentInterface>(
      `http://localhost:3000/comments/${id}`,
      {
        body: text,
      }
    );
  }

  deleteComment(id: string): Observable<{}> {
    return this.httpClient.delete(`http://localhost:3000/comments/${id}`);
  }
}
