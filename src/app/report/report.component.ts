import {Component, Input, OnInit} from '@angular/core';
import { ThirdPartyDraggable } from '@fullcalendar/interaction';
import { Board } from '../models/board';
import { Workspace } from '../models/workspace';
import { BoardService } from '../services/board.service';
import { WorkspaceService } from '../services/workspace.service';
import {Chart} from "chart.js";
import {ReportService} from "../services/report.service";
import { TaskService } from '../services/task.service';
import { Task } from '../models/Task';
import { O } from 'chart.js/dist/chunks/helpers.core';
interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  isSideNavCollapsed = false;
  screenWidths = 0;
  workspaceCount !: number;
  isClick:string="workspace";
  workspaces:Workspace[]=[];
  boards:Board[]=[];
  assignTask:Task[]=[];
  assignedTask:Task[]=[];
  boardCount : number = 0;
  assignCount : number=0;
  assignedtask:number=0;
  @Input() collapsed = false;
  @Input() screenWidth = 0;
  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidths = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }
   userId=Number(this.getUserId())
  getBodyClass(): string {
    let styleClass = '';
    if(this.collapsed && this.screenWidth > 768) {
      styleClass = 'body-trimmed';
    } else if(this.collapsed && this.screenWidth <= 768 && this.screenWidth > 0) {
      styleClass = 'body-md-screen'
    }
    return styleClass;
  }
  constructor(private reportService:ReportService,private workspaceService : WorkspaceService , private boardService : BoardService,private taskService:TaskService) { }

  getUserId():number | null{
    return window.localStorage.getItem('userId') as number | null;

  }

  ngOnInit(): void {
   this.isClick="workspace";
   this.taskService.selectTaskByUserId(this.getUserId() as number).subscribe(
    data=>
    {

      for(let j=0;j<data.length;j++)
      {
        this.taskService.getTaskListById(data[j].taskList.id).subscribe(d=>
          {
            console.log(d.title);

           if(d.title=='ToDo' || d.title=='Doing')
             this.assignTask.push(data[j]);
             else if(d.title=='Done')
             this.assignedTask.push(data[j]);
          });
        }
      });
    this.workspaceService.getWorkspace(this.getUserId() as number).subscribe(data=>{
      this.workspaceCount=data.length;
      this.workspaces=data;
      for(let i=0;i<data.length;i++){

        this.boardService.getBoard(data[i].id,this.getUserId()as number).subscribe(f=>{

          // console.log(data[i].id);
          this.boardCount=f.length+this.boardCount;
          // console.log(f.length);
          for(let j=0;j<f.length;j++)
          {
            this.boards.push(f[j]);
          }


        });
      }

    });


  }
 isClicks(target:string)
 {
 this.isClick=target;
 }

 exportWorkspace(id:number){
   this.reportService.exportWorkspace(id).subscribe(data=>{
     alert("exported successfully")
   })
 }

  exportBoard(id:number){
    this.reportService.exportBoard(id).subscribe(data=>{
      alert("exported successfully")
    })
  }
}
