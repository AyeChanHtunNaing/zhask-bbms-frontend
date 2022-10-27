import { Component, Input, OnInit } from "@angular/core";
import { Task } from "../models/Task";
import { TaskList } from "../models/TaskList";
@Component({
  selector: "app-card",
  templateUrl: "./task.component.html",
  styleUrls: ["./task.component.css"],
})
export class CardComponent implements OnInit {
  @Input() card!: Task;
  title!:string;
  constructor() {
    
  }
  ngOnInit() {
    this.title=window.localStorage.getItem('title') as string;
  }
  dragStart(ev:any) {
    ev.dataTransfer.setData("text", ev.target.id);
   window.localStorage.setItem('taskId',this.card.id+"");
   window.localStorage.setItem('description',this.card.description);
   this.title=window.localStorage.getItem('title') as string;
   window.localStorage.removeItem('title')
  }
  update(){
    alert("update")
   
  }
  delete(){
    
    // if(this.title=="ToDo"){
    //   alert("can't delete")
    // }else{
    //   alert("delete")
    // }
  }
}
