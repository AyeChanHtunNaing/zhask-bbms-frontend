import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
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
  @ViewChild('updatedescription') updatedescription!:ElementRef;

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
  getUserId():number | null{
    return window.localStorage.getItem('userId') as number | null;
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
      this.users.push(this.user);
      this.board.users=this.users;
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
    }
  }

  getBoard()
  {
    this.boardService.getBoard(this.workspace.id).subscribe(data => {
      this.boards = data;
      for(let i=0;i<this.boards.length;i++)
      {
       this.boardService.getTaskByBoardId(this.boards[i].id).subscribe(d=>
        {
          let c=new Count();
          c.boardId=this.boards[i].id;
          c.countOfTask=d.length;
          this.counts[i]=c
        });
      }
    });
   this.countOfTaskAndMember=this.counts;
  }

  ngOnInit() {
    this.workspace.id=this.route.snapshot.params['workspaceId'];
    this.board.workSpace=this.workspace;
    this.getBoard();
  }

  goTotaskLists(baordId:number){
    this.router.navigate(['board', baordId]);
  }
 
  setBoardDetails(board:Board){
    this.BoardDetails=board;
    this.boardDesc=this.BoardDetails.name;
    window.localStorage.setItem('des',this.boardDesc);
    window.localStorage.setItem('id',this.BoardDetails.id+"");
  }

  getBoardDetails():string{
    return window.localStorage.getItem('des') as string;
  }

  getId():string{
    return window.localStorage.getItem('id') as string;
  }

  updateBoardDescription(){
    const value=this.updatedescription.nativeElement.value;
    console.log(value);
    this.board.name=value;
    console.log(this.board.name);
    console.log(this.getId());
    this.boardService.updateBoardById(this.getId(),this.board).subscribe(data=>{
    console.log(data);
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
    this.getBoard();
  }

  deleteBoard(boardId : number){

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
      this.getBoard();
}
}
