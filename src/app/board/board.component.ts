import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { TaskListService } from '../services/tasklist.service';
import { ActivatedRoute } from '@angular/router';
import { Board } from '../models/board';
import { TaskList } from '../models/TaskList';
import {InviteMember} from "../models/invitemember";
import {InvitememberService} from "../services/invitemember.service";
import { BoardService } from '../services/board.service';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  invitemember:InviteMember=new InviteMember();
  //form

  inviteForm!:FormGroup;
  submitted = false;
  
  commaSepEmail = (control: AbstractControl): { [key: string]: any } | null => {
    const emails = control.value.split(',').map((e: string)=>e.trim());
    const forbidden = emails.some((email: any) => Validators.email(new FormControl(email)));
    return forbidden ? { 'email': { value: control.value } } : null;
  };

  //board UI layout
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
  // board start
  tasklists!: TaskList[] ;
  tasklist:TaskList=new TaskList();
  listName!: string;
  board:Board=new Board();
  count !: number;

  constructor(private formBuilder: FormBuilder,private tasklistService:TaskListService,private boardService:BoardService
              ,private invitememberService:InvitememberService,private route:ActivatedRoute) {
    this.inviteForm = this.formBuilder.group({
      email: ['',[this.commaSepEmail ]],
    });
  }

  setMockData(): void {
     this.tasklistService.getTaskList(this.board.id).subscribe(data => {
      this.tasklists  = data;
    });
  }

  ngOnInit() {   
    this.board.id=this.route.snapshot.params['boardId'];
    window.localStorage.setItem('count',this.count+"")
    this.tasklist.board=this.board;
    this.setMockData();
    window.localStorage.setItem('boardId',this.board.id+"");

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
      this.ngOnInit()
    }
  }
  addList(listName: string) {
  this.tasklist.title=listName;
  this.tasklistService.createTaskList(this.tasklist)
  .subscribe(res => {

      location.reload();

    },
    err => {

    });

    this.listName=" ";
  }
}
