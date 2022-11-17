import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Board} from "../models/board";
import {Workspace} from "../models/workspace";
import {Count} from "../models/count";
import {User} from "../models/user";
import {FormBuilder} from "@angular/forms";
import {BoardService} from "../services/board.service";
import {InvitememberService} from "../services/invitemember.service";
import {ActivatedRoute, Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-shared-board',
  templateUrl: './shared-board.component.html',
  styleUrls: ['./shared-board.component.css']
})
export class SharedBoardComponent implements OnInit {
  BoardDetails!:Board;
  boardDesc!:string;
  searchTerm: any;
  workspace : Workspace = new Workspace();
  boards:Board[]=[];
  board : Board = new Board();
  counts:Count[]=[]
  countOfTaskAndMember:Count[]=[]
  submitted = false;
  users:User[]=[];
  user:User=new User();
  userEmail=window.localStorage.getItem('userEmail');
  @ViewChild('updatedescription') updatedescription!:ElementRef;
  constructor( private formBuilder: FormBuilder,private boardService: BoardService,private invitememberService:InvitememberService
    ,private route : ActivatedRoute , private router : Router){

  }

  getUserId():number | null{
    return window.localStorage.getItem('userId') as number | null;

  }

  getBoard()
  {
    this.boardService.getBoard(this.workspace.id,this.getUserId()as number).subscribe(data => {
      this.boards = data;
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
      this.ngOnInit();
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
    this.getBoard();
  }
  changed(event, id: number) {
    console.log(this.board)
    console.log(event.target.checked)
    if (event.target.checked == true) {
      this.boardService.setFavBoard(id.toString(), this.board).subscribe(data => {
        console.log(data);
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
}

