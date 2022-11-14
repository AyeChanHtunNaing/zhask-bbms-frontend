import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MessageService} from "../services/message.service";
import {ChatModel} from "../models/chat.model";
interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  username=window.sessionStorage.getItem('userName')
  message!:string;
  isSideNavCollapsed = false;
  screenWidths = 0;
  @Input() collapsed = false;
  @Input() screenWidth = 0;
  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidths = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }

  getBodyClass(): string {
    let styleClass = '';
    if(this.collapsed && this.screenWidth > 768) {
      styleClass = 'body-trimmed';
    } else if(this.collapsed && this.screenWidth <= 768 && this.screenWidth > 0) {
      styleClass = 'body-md-screen'
    }
    return styleClass;
  }
  form: FormGroup;
  chats: ChatModel[];

  constructor(fb: FormBuilder, private service: MessageService) {
    this.form = fb.group({
      sender: ['', Validators.required],
      message: ['', Validators.required]
    });

    this.chats = service.chats;
  }

  ngOnInit() {
    this.service.connect();
  }

  ngOnDestroy() {
    this.service.disconnect();
  }

  send() {
    this.service.sendMessage(this.form.value)
    this.message="";
  }


}
