import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { InviteMember } from '../models/invitemember';
@Injectable({
    providedIn: 'root'
  })
export class InvitememberService {
    private baseURL = "http://localhost:8080/api/v1/invite";
    constructor(private httpClient: HttpClient) { 
      
          }
          inviteMember(invitemember:InviteMember): Observable<Object>{
            return this.httpClient.post(`${this.baseURL}`, invitemember);
    }
}