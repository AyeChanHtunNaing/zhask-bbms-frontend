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

  taskDetails:any;
  editForm!:FormGroup;

  constructor(private taskService:TaskService,private fb:FormBuilder,) {
    this.editForm=this.fb.group({
      description:['',[Validators.required]],
    });
  }
  ngOnInit() {

  }
  dragend(ev:any)
  {
    this.title=window.localStorage.getItem('title') as string;
    // location.reload()
  }
  dragStart(ev:any) {
    ev.dataTransfer.setData("text", ev.target.id);
    window.localStorage.setItem('taskId',this.card.id+"");
    window.localStorage.setItem('description',this.card.description);
  }
  update(task:Task){
    alert("update")

  }
  delete(){
    alert("delete")
  }
  getTaskDetails(task:Task){
    this.taskDetails=task;
    console.log(this.taskDetails)
  }
}
