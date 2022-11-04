import {Component, Input, OnInit} from '@angular/core';
interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-not-activated',
  templateUrl: './not-activated.component.html',
  styleUrls: ['./not-activated.component.css']
})
export class NotActivatedComponent implements OnInit {
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
  constructor() { }

  ngOnInit(): void {
  }

}
