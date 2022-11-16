import {Component, Input, OnInit} from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { WorkspaceService } from '../services/workspace.service';
interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {
  isSideNavCollapsed = false;
  screenWidths = 0;
  @Input() collapsed = false;
  @Input() screenWidth = 0;
  userName:Array<User>=[];
  currentUser!:string;
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

  constructor(private workspaceService : WorkspaceService , private userService : UserService) { }

  getUserId():number | null{
    return window.localStorage.getItem('userId') as number | null;
  
  }

  ngOnInit(): void {
    let set = new Set();
    this.currentUser=window.localStorage.getItem('userName') as string;
    this.workspaceService.getWorkspace(this.getUserId() as number).subscribe(data=>{
      for(let i=0;i<data.length;i++){
        for(let j=0;j<data[i].users.length;j++){
          set.add(data[i].users[j].id);
          // console.log(data[i].users[j].id);    
        }
       }
       for(let entry of set){
        this.userService.getUserNameByUserId(entry as number).subscribe(data=>{
          this.userName.push(data);
        });

      }
    });
   console.log(this.userName);
   
    
  }
}


