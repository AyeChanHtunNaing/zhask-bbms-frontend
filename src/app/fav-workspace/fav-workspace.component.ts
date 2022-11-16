import { Component, OnInit } from '@angular/core';
import {Workspace} from "../models/workspace";
import {WorkspaceService} from "../services/workspace.service";

@Component({
  selector: 'app-fav-workspace',
  templateUrl: './fav-workspace.component.html',
  styleUrls: ['./fav-workspace.component.css']
})
export class FavWorkspaceComponent implements OnInit {
  workspace: Workspace = new Workspace();
  workspaces: Workspace[] = [];
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
