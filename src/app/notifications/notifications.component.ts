import {Component, Input, OnInit} from '@angular/core';
import { NotificationService } from '../services/notification.service';
interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  isSideNavCollapsed = false;
  screenWidths = 0;
  @Input() collapsed = false;
  @Input() screenWidth = 0;
  Notifications:string[]=[];
  constructor(private notifyService:NotificationService) { }
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

  getUserId(): number | null {
    return window.localStorage.getItem('userId') as number | null;
  }

  ngOnInit(): void {
    this.getNoti();
  }


  getNoti(){
    let userId = this.getUserId() as number;
    this.notifyService.getAllNotifications(userId).subscribe(data => {
        for(let i=0;i<data.length;i++){
          this.Notifications.push(data[i].content);
        }
    });
  }

}
