import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {Attachment} from "../models/attachment";

@Injectable({
  providedIn: 'root'
})
export class AttachmentService {
  private baseUrl = 'http://localhost:8080/api/v1/attachment';
  constructor(private http: HttpClient) { }
  upload(file: File,attachment:Attachment): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);
    formData.append('attachment',JSON.stringify(attachment));
    const req = new HttpRequest('POST', `${this.baseUrl}/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }
  getFiles(taskId : number): Observable<Attachment[]> {
    return this.http.get<Attachment[]>(`${this.baseUrl}/${taskId}`);
  }

  getFileById(id:number):  Observable<HttpResponse<Blob>> {

    return this.http.get(`${this.baseUrl}/files/${id}`, { responseType: 'blob', observe: 'response' });

  }
}
