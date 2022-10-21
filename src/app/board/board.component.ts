import {Component, Input, OnInit} from '@angular/core';
import {CardStore} from '../models/CardStore';
import {FormGroup} from "@angular/forms";
import { TaskListService } from '../services/tasklist.service';
import { ActivatedRoute } from '@angular/router';
import { Board } from '../models/board';
import { TaskList } from '../models/TaskList';
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
  //form
  registerForm!: FormGroup;
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
  // board starts
  cardStores!: CardStore;
  tasklists!: TaskList[] ;
  tasklist:TaskList=new TaskList();
  listName!: string;
  board:Board=new Board();
  constructor(private tasklistService:TaskListService,private route:ActivatedRoute) { }
  setMockData(): void {
    this.cardStores = new CardStore();
   
     this.tasklistService.getTask(this.board.id).subscribe(data => {
      this.tasklists  = data;
    });
  }

  ngOnInit() {
    this.board.id=this.route.snapshot.params['boardId'];
    this.tasklist.board=this.board;
    this.setMockData();
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
