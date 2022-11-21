import {Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, TemplateRef, ViewChild} from '@angular/core';
import { Workspace } from '../models/workspace';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { WorkspaceService } from '../services/workspace.service';
import { EmailResponse } from '../message/emailresponse';
import { InviteMember } from '../models/invitemember';
import { InvitememberService } from '../services/invitemember.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { User } from '../models/user';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit ,OnChanges {
  workspaceName!:string;
  workspaceDetails!: Workspace;
  workspaceDesc!: string;
  searchTerm!: string;
  isSideNavCollapsed = false;
  screenWidths = 0;
  workspace: Workspace = new Workspace();
  invitemember: InviteMember = new InviteMember();
  workspaces: Workspace[] = [];
  users: User[] = [];
  user: User = new User();
  username= window.localStorage.getItem('userName');
  modalRef!: BsModalRef;
  isDataAvailable:boolean=true;
   date = new Date; // get current date
   current = this.date.getDay();
   today=this.checkDay();
  @Input() collapsed = false;
  @Input() screenWidth = 0;
  userEmail=window.localStorage.getItem('userEmail');
  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidths = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }

// Validation

  registerForm!: FormGroup;
  submitted = false;
  commaSepEmail = (control: AbstractControl): { [key: string]: any } | null => {
    const emails = control.value.split(',').map((e: string) => e.trim());
    const forbidden = emails.some((email: any) => Validators.email(new FormControl(email)));
    return forbidden ? {'email': {value: control.value}} : null;
  };

  constructor(private formBuilder: FormBuilder, private modalService: BsModalService,private workspaceService: WorkspaceService, private invitememberService: InvitememberService
    , private router: Router) {
    this.registerForm = this.formBuilder.group({
      email: ['', [this.commaSepEmail]],
      name: ['', [Validators.required]],
      desc: ['', [Validators.required]],
    });

  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  emailresponse: EmailResponse = {
    token: ''

  }

  getBodyClass(): string {
    let styleClass = '';
    if (this.collapsed && this.screenWidth > 768) {
      styleClass = 'body-trimmed';
    } else if (this.collapsed && this.screenWidth <= 768 && this.screenWidth > 0) {
      styleClass = 'body-md-screen'
    }
    return styleClass;
  }

  //Add user form actions
  get f() {
    return this.registerForm.controls;
  }

  getUserId(): number | null {
    return window.localStorage.getItem('userId') as number | null;
  }

  onSubmit() {

    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    //True if all the fields are filled
    if (this.submitted) {
      this.user.id = this.getUserId() as number;
      this.users.push(this.user);
      this.workspace.users = this.users;
      this.workspace.createdBy = window.localStorage.getItem('userEmail') as string;
      this.workspaceService.createWorkspace(this.workspace).subscribe(res => {
         this.modalRef.hide()
        this.getWorkspaces()
        },
        err => {

        });
      this.registerForm.reset()
    }

  }

  getWorkspaces() {
    let userId = this.getUserId() as number;
    this.workspaceService.getWorkspace(userId).subscribe(data => {
      this.workspaces = data;
      this.isDataAvailable=this.workspaces.length>0;
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
    this.workspaceName=this.getWorkspaceDetails()
  }

  getWorkspaceDetails(): string {
    return window.localStorage.getItem('des') as string;
  }

  getId(): string {
    return window.localStorage.getItem('id') as string;
  }

  updateWorkspaceDescription() {
    const value = this.workspaceName;
    console.log(value);
    this.workspace.name = value;
    console.log(this.workspace.name);
    console.log(this.getId());

    this.workspaceService.updateWorkspaceById(this.getId(),this.workspace).subscribe(data=>{
      this.modalRef.hide()
      this.getWorkspaces()

    })

    // setTimeout(function(){
    //   window.location.reload();
    // }, 900);

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
        // setTimeout(function(){
        //   //window.location.reload();
        // }, 1000);
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
  checkDay(){
    if(this.current==1){
       return "Monday"
    }
    if(this.current==2){
      return "Tuesday"
    }
    if(this.current==3){
      return "Wednesday"
    }
    if(this.current==4){
      return "Thursday"
    }
    if(this.current==5){
      return "Friday"
    }
    return "Weekend"
  }
  openModal(template: TemplateRef<any>) {
    this.workspace.description="";
    this.workspace.name=""
    this.modalRef = this.modalService.show(template);
  }
}


