import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EmailResponse } from '../message/emailresponse';
import { Board } from '../models/board';
import { InviteMember } from '../models/invitemember';
import { Workspace } from '../models/workspace';
import { BoardService } from '../services/board.service';
import { InvitememberService } from '../services/invitemember.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  workSpace : Workspace = new Workspace();
  boards:Board[]=[];
  board : Board = new Board();
  invitemember:InviteMember=new InviteMember();
  registerForm!: FormGroup;
  
  submitted = false;
  commaSepEmail = (control: AbstractControl): { [key: string]: any } | null => {
    const emails = control.value.split(',').map((e: string)=>e.trim());
    const forbidden = emails.some((email: any) => Validators.email(new FormControl(email)));
    return forbidden ? { 'email': { value: control.value } } : null;
  };

  constructor( private formBuilder: FormBuilder,private boardService: BoardService,private invitememberService:InvitememberService){
    this.registerForm = this.formBuilder.group({
      email: ['',[this.commaSepEmail ]],
      name: ['', [Validators.required]],
      desc: ['', [Validators.required]],
    });
  }

  emailresponse:EmailResponse={
    token:''

  }

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
      this.boardService.createBoard(this.board)
        .subscribe(res => {

            location.reload();

          },
          err => {

          });

      this.invitememberService.inviteMember(this.invitemember).subscribe(res=>{
        },
        err=>
        {

        }
      )

      this.getBoard();
    }

  }
  getBoard()
  {
    this.boardService.getBoard(this.workSpace.id).subscribe(data => {
      this.boards = data;
    });
  }
  ngOnInit() {
    this.getBoard();

  }

  goTotaskLists(item:number){
    alert(this.board.name)
  }
}
