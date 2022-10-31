import { Component, Input, OnInit } from "@angular/core";
import { Task } from "../models/Task";
import { TaskService } from "../services/task.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
@Component({
  selector: "app-card",
  templateUrl: "./task.component.html",
  styleUrls: ["./task.component.css"],
})
export class CardComponent implements OnInit {
  @Input() card!: Task;
  @Input() title!:string;
  isView: boolean=false;
  taskDetails!:Task;
  taskDesc!:string;
  editForm!:FormGroup;

  constructor(private taskService:TaskService,private fb:FormBuilder,) {
    this.editForm=this.fb.group({
      taskDesc:['',[Validators.required]],
    });

  }
  ngOnInit() {
    
  }
  
  dragend(ev:any)
  {
    this.title=window.localStorage.getItem('title') as string;
  }
  dragStart(ev:any) {
    ev.dataTransfer.setData("text", ev.target.id);
    window.localStorage.setItem('taskId',this.card.id+"");
    window.localStorage.setItem('description',this.card.description);
  }
  update(task:Task){
    alert("update"+this.card.description)

  }
  delete(taskId:number){
      let decision=confirm("Are you sure to delete Note?");
      if(decision==true){
    this.taskService.deleteTask(taskId).subscribe(data => {
      location.reload()
    })
      }

    }
    setTaskDetails(task:Task){
      this.taskDetails=task;
      this.taskDesc=this.taskDetails.description;
      console.log(this.taskDesc)
     window.localStorage.setItem('des',this.taskDesc)
    }
    getTaskDetails():string
    {
    return window.localStorage.getItem('des') as string;
    }
  
}

