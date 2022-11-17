import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Workspace} from "../models/workspace";
import {WorkspaceService} from "../services/workspace.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-fav-workspace',
  templateUrl: './fav-workspace.component.html',
  styleUrls: ['./fav-workspace.component.css']
})
export class FavWorkspaceComponent implements OnInit {
  workspaceDetails!: Workspace;
  workspaceDesc!: string;
  workspace: Workspace = new Workspace();
  workspaces: Workspace[] = [];
  @ViewChild('updatedescription') updatedescription!: ElementRef;
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

  deleteWorkspace(workspaceId: number) {

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.workspaceService.deleteWorkspaceById(workspaceId).subscribe(data => {
          this.ngOnInit();
        });

        Swal.fire(
          'Deleted!',
          'Your task has been deleted.',
          'success'
        )
      }
    });
    this.getWorkspaces();
  }
}
