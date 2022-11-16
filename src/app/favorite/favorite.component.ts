import {Component, Input, OnInit} from '@angular/core';
import {Workspace} from "../models/workspace";
import {WorkspaceService} from "../services/workspace.service";
interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}
@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {
  workspace: Workspace = new Workspace();
  workspaces: Workspace[] = [];
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
  constructor(private workspaceService: WorkspaceService) { }

  ngOnInit(): void {
    this.getWorkspaces()
  }
  getUserId(): number | null {
    return window.localStorage.getItem('userId') as number | null;
  }
  getWorkspaces() {
    let userId = this.getUserId() as number;
    this.workspaceService.getFavWorkspace(userId).subscribe(data => {
      this.workspaces = data;
    });
  }
}
