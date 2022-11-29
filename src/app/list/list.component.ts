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
import { NotiEmailService } from "../services/notiemail.service";
import { NotiEmail } from "../models/notiemail";
import { BoardService } from "../services/board.service";
import { UserService } from "../services/user.service";

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
   notiEmails:NotiEmail[]=[];
   notiEmail:NotiEmail=new NotiEmail();
   message!:string;
   userName= window.localStorage.getItem('userName');
   createdId!:number;
  constructor(private userService:UserService,private boardService:BoardService,private notiEmailService:NotiEmailService,private router: Router,private logsService:LogsService,private taskService : TaskService,private taskListService:TaskListService) {}
  toggleDisplayAddCard() {
    this.displayAddCard = !this.displayAddCard;
  }
  ngOnInit(): void {
   // window.localStorage.removeItem('description')
  this.changeDone();
    this.taskService.getTask(this.tasklist.id).subscribe(data=>
    {
      this.tasks=data;
    });
  }
  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
       // console.log(currentUrl);

    });
}
changeDone()
{
  this.taskService.getTask(this.tasklist.id).subscribe(data=>
    {
      for(let i=0;i<data.length;i++)
      {
        if(data[i].endDate!=null &&new Date(data[i].endDate)<=new Date(Date.now())){
          console.log("End date"+new Date(data[i].endDate)+" Now "+new Date(Date.now()));

          this.taskService.updateTaskListToDone(data[i].id,data[i]).subscribe(d=>{
           // this.reloadCurrentRoute()
          });
        }
      }

    });
}
  allowDrop($event:any) {
    $event.preventDefault();
  // alert(this.tasklist.title)
   window.localStorage.setItem('m',this.tasklist.title)
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
    //this.task.profile=""
    this.user.id=this.getUserId() as number;
    this.users.push(this.user);
    this.task.users=this.users;
    //this.task.startDate=
    if(window.localStorage.getItem('move')!=null)
    this.message=this.userName+' moved the card from '+window.localStorage.getItem('move')+' to '+this.tasklist.title+" at "+new Date(Date.now());
    else
    this.message=this.userName+' moved the card from '+window.localStorage.getItem('m')+' to '+this.tasklist.title+" at "+new Date(Date.now());
    this.taskService.updateTaskList(this.taskId,this.task).subscribe(data=>
    {
    });
    this.task.id=Number(this.taskId)
    console.log(this.task.id)
    this.logs.task=this.task;
    console.log(this.logs.task)
   
    this.logs.message=this.message
    this.logsService.createLogs(this.logs).subscribe(date=>{

    });
  
    this.sendNoti(' moved the card '+ window.localStorage.getItem('description') as string+' from '+window.localStorage.getItem('title')+' to '+this.tasklist.title+" at "+new Date(Date.now()));
    window.localStorage.removeItem('taskId')
    window.localStorage.removeItem('description');
    window.localStorage.setItem('title',this.tasklist.title);
  }
  dragstart(ev:any)
  {
    //window.localStorage.removeItem('title')
    window.localStorage.setItem('move',this.tasklist.title)
    window.localStorage.setItem('title',this.tasklist.title);
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
        this.message=this.userName+' created this card'+" at "+new Date(Date.now());
        this.logs.message=this.message
        this.ngOnInit();
        this.reloadCurrentRoute();
        this.logsService.createLogs(this.logs).subscribe(date=>{

        });

        
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
   window.localStorage.setItem('move',this.tasklist.title)
   this.sendNoti("card create  "+value+" at "+new Date(Date.now()));

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
    //   this.reloadCurrentRoute();
    // this.ngOnInit();
    });

     setTimeout(function(){
     window.location.reload();
     }, 900);
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Updated Successfully',
      showConfirmButton: false,
      timer: 1500
    });


  }

}

