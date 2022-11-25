import { Injectable } from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {NgToastService} from "ng-angular-popup";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr:ToastrService,private toast: NgToastService) { }
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

}
