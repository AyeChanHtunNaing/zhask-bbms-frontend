import { Component, Input, OnInit } from "@angular/core";
import { Task } from "../models/Task";
import { TaskList } from "../models/TaskList";
import { TaskService } from "../services/task.service";
@Component({
  selector: "app-card",
  templateUrl: "./task.component.html",
  styleUrls: ["./task.component.css"],
})
export class CardComponent implements OnInit {
  @Input() card!: Task;
  title!:string;
  constructor(private taskService:TaskService) {
    
  }
  ngOnInit() {
    this.taskService.getTaskIdWithtaskId(this.card.id).subscribe(
      data=>
      {
       this.title=data.title;
      }
     )
  }
  dragStart(ev:any) {
    
   ev.dataTransfer.setData("text", ev.target.id);
   window.localStorage.setItem('taskId',this.card.id+"");
   window.localStorage.setItem('description',this.card.description);
  
   this.taskService.getTaskIdWithtaskId(this.card.id).subscribe(
    data=>{
     this.title=data.title;
     location.reload();
    });

  }
  update(){
    alert("update")
   
  }
  delete(){
    
  }
 
}
