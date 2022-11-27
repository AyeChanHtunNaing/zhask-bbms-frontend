import { Injectable } from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {NgToastService} from "ng-angular-popup";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NotificationModel } from '../models/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr:ToastrService,private toast: NgToastService,private httpClient: HttpClient) { }
  showToast(message:string){
    this.toastr.success(message);
    this.playAudio();
  }

  playAudio(){
    let audio = new Audio();
    console.log("start");
    audio.src = "../../assets/audio/pikachu.mp3";
    console.log("end");
    audio.load();
    audio.play();
  }

  private baseURL = "http://localhost:8080/noti";

  getNotifications(userId:number): Observable<NotificationModel[]> {
    return this.httpClient.get<NotificationModel[]>(`${this.baseURL}/${userId}`)
  }

}
