import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { Workspace } from '../models/workspace';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WorkspaceService } from '../services/workspace.service';
import { EmailResponse } from '../message/emailresponse';
import { InviteMember } from '../models/invitemember';
import { InvitememberService } from '../services/invitemember.service';
interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css']
})
export class WorkspaceComponent implements OnInit {
  isSideNavCollapsed = false;
  screenWidths = 0;
  workspace : Workspace =new Workspace();
  invitemember:InviteMember=new InviteMember();
  workspaces:Workspace[]=[];
  @Input() collapsed = false;
  @Input() screenWidth = 0;

  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidths = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }
// Validation

  registerForm!: FormGroup;
  submitted = false;
  constructor( private formBuilder: FormBuilder,private workspaceService: WorkspaceService,private invitememberService:InvitememberService){
    this.registerForm = formBuilder.group({
      email: ['', [Validators.email]],
      name: ['', [Validators.required]],
      desc: ['', [Validators.required]],
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.email]],
      name: ['', [Validators.required]],
      desc: ['', [Validators.required]],
    });
    throw new Error('Method not implemented.');
  }
  emailresponse:EmailResponse={
    token:''
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
  //Add user form actions
  get f() {
    return this.registerForm.controls;
  }
  onSubmit() {

    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    //True if all the fields are filled
    if(this.submitted)
    {
      this.workspaceService.createWorkspace(this.workspace)
        .subscribe(res => {
            this.emailresponse= res as EmailResponse;

            //alert(this.emailresponse.token);
            location.reload();

          },
          err => {
            this.emailresponse = err;

            // alert(this.emailresponse.token);
          });

      this.invitememberService.inviteMember(this.invitemember).subscribe(res=>{
        },
        err=>
        {

        }
      )

      this.getWorkspaces();
    }

  }
  getWorkspaces()
  {
    this.workspaceService.getWorkspace().subscribe(data => {
      this.workspaces = data;
    });
  }
  ngOnInit() {
    this.getWorkspaces();

  }


  goToBoard(item:number){
    alert("Hello")
  }
}
