import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { Task } from "../models/Task";
import { TaskList } from "../models/TaskList";
import { TaskService } from "../services/task.service";
import Swal from "sweetalert2";
import {TaskListService} from "../services/tasklist.service";
import { Board } from "../models/board";
import { User } from "../models/user";
import { Router } from "@angular/router";
import {Logs} from "../models/logs";
import {LogsService} from "../services/logs.service";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"],
})
export class ListComponent implements OnInit {
  taskListDetails!:TaskList;
  @Input() tasklist!: TaskList;
  @ViewChild('updatetitle') updatetitle!:ElementRef;
  displayAddCard = false;
  taskList : TaskList = new TaskList();
  task : Task = new Task();
  tasks:Task[]=[];
  tasklistModel : TaskList = new TaskList();
  taskId!:string;
  board : Board = new Board();
   user:User=new User();
   users:User[]=[];
   logs:Logs=new Logs();
   message!:string;
   userName= window.localStorage.getItem('userName');
   createdId!:number;
  constructor(private router: Router,private logsService:LogsService,private taskService : TaskService,private taskListService:TaskListService) {}
  toggleDisplayAddCard() {
    this.displayAddCard = !this.displayAddCard;
  }
  ngOnInit(): void {
    this.taskService.getTask(this.tasklist.id).subscribe(data=>
    {
      this.tasks=data;
    })
  }
  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
       // console.log(currentUrl);

    });
}
  allowDrop($event:any) {
    $event.preventDefault();

  }

  getUserId():number | null{
    return window.localStorage.getItem('userId') as number | null;
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
    this.user.id=this.getUserId() as number;
    this.users.push(this.user);
    this.task.users=this.users;
    //this.task.startDate=
    this.taskService.updateTaskList(this.taskId,this.task).subscribe(data=>
    {
    });
    this.task.id=Number(this.taskId)
    console.log(this.task.id)
    this.logs.task=this.task;
    console.log(this.logs.task)
    this.message=this.userName+' moved the card to '+this.tasklist.title
    this.logs.message=this.message
    this.logsService.createLogs(this.logs).subscribe(date=>{

    });
    window.localStorage.removeItem('taskId')
    window.localStorage.removeItem('description');
    window.localStorage.setItem('title',this.tasklist.title);

  }
  dragstart(ev:any)
  {
    window.localStorage.setItem('title',this.tasklist.title);
    //alert(this.tasklist.title)
  }
  getId():string{
    return window.localStorage.getItem('id') as string;
  }
  onEnter(value: string) {
    if(value!=""&& value!=null){
    this.tasklistModel.id=this.tasklist.id;
    this.task.description=value;
    this.task.taskList=this.tasklistModel;
    this.board.id=Number(window.localStorage.getItem('boardId'));
    this.task.createdBy=window.localStorage.getItem('userEmail') as string;
    this.task.board=this.board;
    this.user.id=this.getUserId() as number;
    this.users.push(this.user);
    this.task.users=this.users;
    this.taskService.createTask(this.task).subscribe(res => {
        //location.reload()
        console.log(res);
        this.createdId=res.id
        this.task.id=Number(res.id)
        this.logs.task=this.task;
        console.log(this.logs.task.id)
        this.message=this.userName+' created this card'
        this.logs.message=this.message
        this.logsService.createLogs(this.logs).subscribe(date=>{

        });

        this.ngOnInit()
      },
      err => {
        console.log(err);
      });
    this.taskService.getTask(this.tasklist.id).subscribe(data=>{
      this.tasks=data;
      console.log(this.tasks)
    });


    }else{
      Swal.fire({
        icon: 'error',
        title: 'No Input',
        text: 'Please fill the data'
      });
    }

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
        // this.reloadCurrentRoute();
        this.ngOnInit();
        // setTimeout(function(){
        // //  window.location.reload();
        // }, 1000);
      }
    });
  }

  setTaskListDetails(taskList:TaskList){
    this.taskListDetails=taskList;
    window.localStorage.setItem('des',this.taskListDetails.title)
    window.localStorage.setItem('id',this.taskListDetails.id+"");
  }

  getTaskListDetails():string{
    return window.localStorage.getItem('des') as string;
  }

  updateTaskListTitle(){
    const value=this.updatetitle.nativeElement.value;
    console.log(value);
    this.taskList.title=value;
    this.taskListService.updateTaskList(this.getId(),this.taskList).subscribe(data=>{
      console.log(data);
      this.reloadCurrentRoute();
    this.ngOnInit();
    });

    // setTimeout(function(){
    // //  window.location.reload();
    // }, 900);
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Updated Successfully',
      showConfirmButton: false,
      timer: 1500
    });


  }

}

