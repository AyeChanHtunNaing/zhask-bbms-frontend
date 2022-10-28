import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { Workspace } from '../models/workspace';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { WorkspaceService } from '../services/workspace.service';
import { EmailResponse } from '../message/emailresponse';
import { InviteMember } from '../models/invitemember';
import { InvitememberService } from '../services/invitemember.service';
import { Board } from '../models/board';
import { BoardService } from '../services/board.service';
import { ActivatedRoute, Router } from '@angular/router';
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
  workspace : Workspace = new Workspace();
  boards:Board[]=[];
  board : Board = new Board();
  invitemember:InviteMember=new InviteMember();
  registerForm!: FormGroup;
  inviteForm!:FormGroup;


  submitted = false;
  commaSepEmail = (control: AbstractControl): { [key: string]: any } | null => {
    const emails = control.value.split(',').map((e: string)=>e.trim());
    const forbidden = emails.some((email: any) => Validators.email(new FormControl(email)));
    return forbidden ? { 'email': { value: control.value } } : null;
  };

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

  constructor( private formBuilder: FormBuilder,private boardService: BoardService,private invitememberService:InvitememberService
                ,private route : ActivatedRoute , private router : Router){
    this.registerForm = this.formBuilder.group({

      name: ['', [Validators.required]],
      desc: ['', [Validators.required]],
    });
    this.inviteForm = this.formBuilder.group({
      email: ['',[this.commaSepEmail ]],
    });

  }

  emailresponse:EmailResponse={
    token:''

  }

  get f() {
    return this.registerForm.controls;
  }

  onRegisterSubmit() {

    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    //True if all the fields are filled
    if(this.submitted)
    {
      this.boardService.createBoard(this.board)
        .subscribe(res => {

            location.reload();

          },
          err => {

          });
     // alert("Process successfully done")
      this.getBoard();
    }
  }
  onInviteSubmit() {

    this.submitted = true;
    // stop here if form is invalid
    if (this.inviteForm.invalid) {
      return;
    }
    //True if all the fields are filled
    if(this.submitted)
    {
      this.invitememberService.inviteMember(this.invitemember).subscribe(res=>{
        },
        err=>
        {

        }
      );
      alert("Process successfully done")
      this.getBoard();
    }
  }
  getBoard()
  {
    this.boardService.getBoard(this.workspace.id).subscribe(data => {
      this.boards = data;
    });
  }
  ngOnInit() {
    //this.board.workSpace.id=this.route.snapshot.params['workspaceId'];
    this.workspace.id=this.route.snapshot.params['workspaceId'];
    this.board.workSpace=this.workspace;
    this.getBoard();
  }

  goTotaskLists(baordId:number){
    this.router.navigate(['board', baordId]);
  }
}
