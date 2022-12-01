import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { TaskListService } from '../services/tasklist.service';
import {ActivatedRoute, Router} from '@angular/router';
import { Board } from '../models/board';
import {TaskList} from '../models/TaskList';
import {InviteMember} from "../models/invitemember";
import {InvitememberService} from "../services/invitemember.service";
import { BoardService } from '../services/board.service';
import Swal from 'sweetalert2';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {UserService} from "../services/user.service";

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
  userId=window.localStorage.getItem('userId');
  inviteForm!:FormGroup;
  addListForm!:FormGroup;
  submitted = false;
  isDataAvailable:boolean=true;
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
  boardName: string | null | undefined;
  modalRef!: BsModalRef;
  members:String[]=[];
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
  count!: number;
  constructor(private modalService: BsModalService,private router: Router,private formBuilder: FormBuilder,private tasklistService:TaskListService,private boardService:BoardService
              ,private invitememberService:InvitememberService,private userService:UserService,private route:ActivatedRoute) {
    this.inviteForm = this.formBuilder.group({
      email: ['',[this.commaSepEmail ]],
    });
    this.addListForm = this.formBuilder.group({
      listName: ['',[Validators.required ]],
    });
  }

  setMockData(): void {

     this.tasklistService.getTaskList(this.board.id,Number(this.userId)).subscribe(data => {
      this.tasklists  = data;
      this.isDataAvailable=this.tasklists.length>0;

    });
  }

  ngOnInit() {

    this.board.id=this.route.snapshot.params['boardId'];
    window.localStorage.setItem('count',this.count+"")
    this.tasklist.board=this.board;
    this.boardService.getBoardById(this.board.id).subscribe(data=>{
      this.boardName=data.name;
    })
    this.setMockData();
    window.localStorage.setItem('boardId',this.board.id+"");
    this.getMembers()
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
      this.invitemember.id=window.localStorage.getItem('userId') as string;
      this.invitemember.name=window.localStorage.getItem('userName') as string;
      this.invitemember.url="board";
      this.invitemember.workspaceId=this.board.id;
      this.invitememberService.inviteMember(this.invitemember).subscribe(res=>{
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'invited successfully',
            showConfirmButton: false,
            timer: 1500
          })
        //this.reloadCurrentRoute()
        this.ngOnInit()
        },
        err=>
        {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Invite Failed',
            showConfirmButton: false,
            timer: 1500
          });
          this.modalRef.hide();
        }
      );

    }
  }

  addList(listName: string) {
    console.log(listName)
    if(listName!="" && listName!=null && listName.trim().length!=0)
    {
      this.tasklist.title=listName;
      this.tasklistService.createTaskList(this.tasklist)
      .subscribe(res => {

          //location.reload();
          this.ngOnInit();
        },
        err => {

        });

        this.listName=" ";
      }
      else
      {
        Swal.fire({
          icon: 'error',
          title: 'No Input',
          text: 'Please fill the data'
        });

      }
    }
  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
      // console.log(currentUrl);

    });

  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  getMembers(){
    this.boardService.getBoardMemberByBoardId(Number(window.localStorage.getItem('boardId'))).subscribe(data=>
    {

      let set = new Set();

      for(let j=0;j<data.users.length;j++){
          set.add(data.users[j].id);
      }
      for(let entry of set){
        this.userService.getUserNameByUserId(entry as number).subscribe(d=>{
          this.members.push(d.name + ' ('+d.email+')');

        });
      }
    });
  }
  getUserId():number | null{
    return window.localStorage.getItem('userId') as number | null;

  }
  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }
}
