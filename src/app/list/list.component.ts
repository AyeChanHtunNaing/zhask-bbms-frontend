import { Component, HostListener, Input, OnInit } from "@angular/core";
import { Task } from "../models/Task";
import { TaskList } from "../models/TaskList";
import { TaskService } from "../services/task.service";
import { TitleStrategy } from "@angular/router";
import Swal from "sweetalert2";
import {TaskListService} from "../services/tasklist.service";
import { Board } from "../models/board";
@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"],
})
export class ListComponent implements OnInit {
  taskListDetails!:TaskList;
  @Input() tasklist!: TaskList;
  displayAddCard = false;
  task : Task = new Task();
  tasks:Task[]=[];
  tasklistModel : TaskList = new TaskList();
  taskId!:string;
  board : Board = new Board();

  constructor(private taskService : TaskService,private taskListService:TaskListService) {}
  toggleDisplayAddCard() {
    this.displayAddCard = !this.displayAddCard;
  }
  ngOnInit(): void {
    this.taskService.getTask(this.tasklist.id).subscribe(data=>
    {
      this.tasks=data;
    })
  }
  allowDrop($event:any) {
    $event.preventDefault();

  }
  drop($event:any) {
    $event.preventDefault();
    const data = $event.dataTransfer.getData("text");
    let target = $event.target;
    const targetClassName = target.className;
    while (target.className !== "list") {
      target = target.parentNode;
    }
    target = target.querySelector(".cards");
    if (targetClassName === "card") {
      $event.target.parentNode.insertBefore(
        document.getElementById(data),
        $event.target
      );
    } else if (targetClassName === "list__title") {
      if (target.children.length) {
        target.insertBefore(document.getElementById(data), target.children[0]);
      } else {
        target.appendChild(document.getElementById(data));
      }
    } else {
      target.appendChild(document.getElementById(data));
    }
    this.task.description=window.localStorage.getItem('description') as string;
    this.tasklistModel.id=this.tasklist.id;
    this.taskId=window.localStorage.getItem('taskId') as string;
    this.task.taskList=this.tasklistModel;
    this.board.id=Number(window.localStorage.getItem('boardId'));
    this.task.board=this.board;
    this.taskService.updateTask(this.taskId,this.task).subscribe(data=>
    {
    });
    window.localStorage.removeItem('taskId');
    window.localStorage.removeItem('description');
    window.localStorage.setItem('title',this.tasklist.title)

  }
  dragstart(ev:any)
  {
    window.localStorage.setItem('title',this.tasklist.title);
    //alert(this.tasklist.title)
  }
  onEnter(value: string) {
    this.tasklistModel.id=this.tasklist.id;
    this.task.description=value;
    this.task.taskList=this.tasklistModel;
    this.board.id=Number(window.localStorage.getItem('boardId'));
    this.task.board=this.board;
    this.taskService.createTask(this.task).subscribe(res => {
        location.reload();
        console.log(res);
      },
      err => {
        console.log(err);
      });
    this.taskService.getTask(this.tasklist.id).subscribe(data=>
    {
      this.tasks=data;
    })
  }
  delete(taskId:number){
  
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
        this.taskListService.deleteTaskList(taskId).subscribe(data => {
          
        })
        
        Swal.fire(
          'Deleted!',
          'Your task has been deleted.',
          'success'
        )
        setTimeout(function(){
          window.location.reload();
        }, 1000);
      }
    });
  }
  setTaskListDetails(taskList:TaskList){
    this.taskListDetails=taskList;
    window.localStorage.setItem('des',this.taskListDetails.title)
  }
  getTaskListDetails():string
  {
    return window.localStorage.getItem('des') as string;
  }
}

