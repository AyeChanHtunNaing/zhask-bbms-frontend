import { Component, OnInit } from '@angular/core';
import {Workspace} from "../models/workspace";
import {Board} from "../models/board";
import {BoardService} from "../services/board.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-fav-board',
  templateUrl: './fav-board.component.html',
  styleUrls: ['./fav-board.component.css']
})
export class FavBoardComponent implements OnInit {
  board: Board = new Board();
  boards: Board[] = [];
  constructor(private boardService: BoardService) { }

  ngOnInit(): void {
    this.getBoards()
  }
  getUserId(): number | null {
    return window.localStorage.getItem('userId') as number | null;
  }
  getBoards() {
    let userId = this.getUserId() as number;
    this.boardService.getFavBoard(userId).subscribe(data => {
      this.boards = data;
    });
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

      }});
    this.getBoards();
  }
}

