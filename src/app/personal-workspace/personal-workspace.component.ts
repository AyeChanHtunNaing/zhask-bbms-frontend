import {Component, ElementRef, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {Workspace} from "../models/workspace";
import {User} from "../models/user";
import {FormBuilder, Validators} from "@angular/forms";
import {WorkspaceService} from "../services/workspace.service";
import {InvitememberService} from "../services/invitemember.service";
import {Router} from "@angular/router";
import {EmailResponse} from "../message/emailresponse";
import Swal from "sweetalert2";

@Component({
  selector: 'app-personal-workspace',
  templateUrl: './personal-workspace.component.html',
  styleUrls: ['./personal-workspace.component.css']
})
export class PersonalWorkspaceComponent implements OnInit {
  workspaceDetails!: Workspace;
  workspaceDesc!: string;
  searchTerm!: string;
  workspaces: Workspace[] = [];

  workspace: Workspace = new Workspace();
  users: User[] = [];
  user: User = new User();
  username= window.localStorage.getItem('userName');
  userEmail=window.localStorage.getItem('userEmail');
  @ViewChild('updatedescription') updatedescription!: ElementRef;
  constructor(private formBuilder: FormBuilder, private workspaceService: WorkspaceService,
     private router: Router) {

  }

  ngOnChanges(changes: SimpleChanges): void {

  }


  getUserId(): number | null {
    return window.localStorage.getItem('userId') as number | null;
  }



  getWorkspaces() {
    let userId = this.getUserId() as number;
    this.workspaceService.getWorkspace(userId).subscribe(data => {
      this.workspaces = data;
    });
  }

  ngOnInit() {
    this.getWorkspaces();

  }

  goToBoard(workspaceId: number) {
    this.router.navigate(['workspace', workspaceId]);
  }

  setWorkspaceDetails(workspace: Workspace) {
    this.workspaceDetails = workspace;
    this.workspaceDesc = this.workspaceDetails.name;
    window.localStorage.setItem('des', this.workspaceDesc);
    window.localStorage.setItem('id', this.workspaceDetails.id + "");
  }

  getWorkspaceDetails(): string {
    return window.localStorage.getItem('des') as string;
  }

  getId(): string {
    return window.localStorage.getItem('id') as string;
  }

  updateWorkspaceDescription() {
    const value = this.updatedescription.nativeElement.value;
    console.log(value);
    this.workspace.name = value;
    console.log(this.workspace.name);
    console.log(this.getId());

    this.workspaceService.updateWorkspaceById(this.getId(),this.workspace).subscribe(data=>{
      this.ngOnInit();

    })


    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Updated Successfully',
      showConfirmButton: false,
      timer: 1500
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

  changed(event, id: number) {
    console.log(event.target.checked)
    if (event.target.checked == true) {
      this.workspaceService.setFavWorkspace(id.toString(), this.workspace).subscribe(data => {
        console.log(data);
      })
    }
  }

  checkWorkspace(item: Workspace) {
    console.log(item.marked)
    console.log(item)
    let check = false;
    if (item.marked) {
      check = true;
    }

    return check;
  }

}


