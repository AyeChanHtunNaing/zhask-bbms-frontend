import {Component, ElementRef,Directive, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import { Workspace } from '../models/workspace';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EmailResponse } from '../message/emailresponse';
import { InviteMember } from '../models/invitemember';
import { InvitememberService } from '../services/invitemember.service';
import { Board } from '../models/board';
import { BoardService } from '../services/board.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Count } from '../models/count';
import Swal from 'sweetalert2';
import { User } from '../models/user';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {NgxSpinnerService} from "ngx-spinner";
import { NotiEmail } from '../models/notiemail';
import { UserService } from '../services/user.service';
import { NotiEmailService } from '../services/notiemail.service';
import {WorkspaceService} from "../services/workspace.service";
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
  BoardDetails!:Board;
  boardDesc!:string;
  searchTerm: any;
  isSideNavCollapsed = false;
  screenWidths = 0;
  workspace : Workspace = new Workspace();
  boards:Board[]=[];
  board : Board = new Board();
  invitemember:InviteMember=new InviteMember();
  registerForm!: FormGroup;
  inviteForm!:FormGroup;
  counts:Count[]=[]
  countOfTaskAndMember:Count[]=[]
  submitted = false;
  users:User[]=[];
  user:User=new User();
  notiEmails:NotiEmail[]=[];
  notiEmail:NotiEmail=new NotiEmail();
//  @ViewChild('updatedDescription') updatedescription!:ElementRef;
  userEmail=window.localStorage.getItem('userEmail');
  modalRef!: BsModalRef;
  boardName!:string;
  isDataAvailable:boolean=true;
  workspaceName: string | null | undefined;
  members:String[]=[];
  commaSepEmail = (control: AbstractControl): { [key: string]: any } | null => {
    const emails = control.value.split(',').map((e: string)=>e.trim());
    const forbidden = emails.some((email: any) => Validators.email(new FormControl(email)));
    return forbidden ? { 'email': { value: control.value } } : null;
  };

  @Input() collapsed = false;
  @Input() screenWidth = 0;
  //submitted = false;
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

  constructor(private notiEmailService:NotiEmailService,private userService:UserService, private formBuilder: FormBuilder,private spinner: NgxSpinnerService ,private modalService: BsModalService,private boardService: BoardService,private invitememberService:InvitememberService
               ,private workspaceService:WorkspaceService ,private route : ActivatedRoute , private router : Router){
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
  getUserId():number | null{
    return window.localStorage.getItem('userId') as number | null;

  }

  sendNoti(value:string)
  {
    this.boardService.getBoardMemberByBoardId(Number(window.localStorage.getItem('boardId'))).subscribe(data=>
      {
        let set = new Set();

        for(let j=0;j<data.users.length;j++){
          if(data.users[j].id!=Number(this.getUserId()))
           set.add(data.users[j].id);
        }
        for(let entry of set){
          this.userService.getUserNameByUserId(entry as number).subscribe(d=>{
            this.notiEmail.content=value;
            this.notiEmail.email=d.email;
            this.notiEmail.name=d.userName;
            this.notiEmails.push(this.notiEmail);
            this.notiEmailService.sendNotiEmail(window.localStorage.getItem('userName') as string,this.notiEmails).subscribe(data=>
              {
               console.log(data+"Hi");

              });
          });
        }
      });
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
      this.user.id=this.getUserId() as number;
      this.board.createdBy=window.localStorage.getItem('userEmail') as string;
      this.users.push(this.user);
      this.board.users=this.users;
      this.boardService.createBoard(this.board)
        .subscribe(res => {
            this.registerForm.reset();
            this.modalRef.hide();
            this.getBoard();
          },
          err => {

          });
        this.submitted=false;
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
      this.invitemember.id=window.localStorage.getItem('userId') as string;
      this.invitemember.name=window.localStorage.getItem('userName') as string;
      this.invitemember.url="workspace";
      this.invitemember.workspaceId=this.workspace.id;
      this.invitememberService.inviteMember(this.invitemember).subscribe(res=>{
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Invited Successfully',
            showConfirmButton: false,
            timer: 1500
          });
          this.modalRef.hide();
      },
        err=>
        {
          alert("error"+err)
        }
      );
    }
  }

  getBoard()

  {
    //this.registerForm.reset()
    this.boardName="";
    this.spinner.show();
    this.boardService.getBoard(this.workspace.id,this.getUserId()as number).subscribe(data => {
      this.boards = data;
      this.isDataAvailable=this.boards.length>0;
      for(let i=0;i<this.boards.length;i++)
      {
       this.boardService.getTaskByBoardId(this.boards[i].id).subscribe(d=>
        {
          let c=new Count();
          c.boardId=this.boards[i].id;
          c.countOfTask=d.length;
          this.boardService.getBoardMemberByBoardId(this.boards[i].id).subscribe(f=>{
            c.countOfMember=f.users.length;
          });
          this.counts[i]=c
        });

      }

    });
    this.spinner.hide();
   this.countOfTaskAndMember=this.counts;

  }

  ngOnInit() {
    this.workspace.id=this.route.snapshot.params['workspaceId'];
    this.workspaceService.getWorkspaceByWorkspaceId(this.workspace.id).subscribe(data=>{
      this.workspaceName=data.name
    })
    this.board.workSpace=this.workspace;
    this.getBoard();
    this.getMembers();

  }

  goTotaskLists(baordId:number){
    this.router.navigate(['board', baordId]);
  }

  setBoardDetails(board:Board){
    this.BoardDetails=board;
    this.boardDesc=this.BoardDetails.name;
    window.localStorage.setItem('des',this.boardDesc);
    window.localStorage.setItem('id',this.BoardDetails.id+"");
    this.boardName=this.getBoardDetails();
  }

  getBoardDetails():string{
    return window.localStorage.getItem('des') as string;
  }

  getId():string{
    return window.localStorage.getItem('id') as string;
  }

  updateBoardDescription(){
   // const value=this.updatedescription.nativeElement.value;
    const value=this.boardName;
    console.log(value);
    this.board.name=value;
    this.boardService.updateBoardById(this.getId(),this.board).subscribe(data=>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Updated Successfully',
        showConfirmButton: false,
        timer: 1500
      });
      this.registerForm.reset()
      this.modalRef.hide()
      this.getBoard();
      this.boardName="";
    });
    this.sendNoti("update board from "+ window.localStorage.getItem('des')+" to "+value+" at "+new Date(Date.now()));
    // setTimeout(function(){
    //   window.location.reload();
    // }, 900);


  }

  deleteBoard(boardId : number,name:string){

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
        this.boardService.deleteBoardById(boardId).subscribe(data => {
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
      }});
      this.sendNoti("delete board "+name+" at "+new Date(Date.now()));

      this.getBoard();
}
  changed(event, id: number) {
    console.log(this.board)
    console.log(event.target.checked)
    if (event.target.checked == true) {
      this.board.marked=true
      this.boardService.setFavBoard(id.toString(), this.board).subscribe(data => {

      })
    }else{
      this.board.marked=false
      this.boardService.setFavBoard(id.toString(), this.board).subscribe(data => {

      })
    }
  }

  checkBoard(item: Board) {
    console.log(item.marked)
    console.log(item)
    let check = false;
    if (item.marked) {
      check = true;
    }

    return check;
  }
  openModal(template: TemplateRef<any>) {
    this.board.name="";
    this.submitted=false;
    this.modalRef = this.modalService.show(template);
  }
 getMembers(){
   let id = this.route.snapshot.params['workspaceId'];
   this.workspaceService.getWorkspaceMemberByWorkspaceId(id).subscribe(data=>
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
}
