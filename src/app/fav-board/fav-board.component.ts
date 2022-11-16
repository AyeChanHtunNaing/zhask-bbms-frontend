import { Component, OnInit } from '@angular/core';
import {Workspace} from "../models/workspace";
import {Board} from "../models/board";
import {BoardService} from "../services/board.service";

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
}

