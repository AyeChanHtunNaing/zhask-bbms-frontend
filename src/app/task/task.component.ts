import {Component, ElementRef, Input, OnInit, ViewChild} from "@angular/core";
import { Task } from "../models/Task";
import { TaskService } from "../services/task.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";

@Component({
  selector: "app-card",
  templateUrl: "./task.component.html",
  styleUrls: ["./task.component.css"],
})
export class CardComponent implements OnInit {
  @Input() card!: Task;
  @Input() title!:string;
  @ViewChild('updatedescription') updatedescription!:ElementRef;
  isView: boolean=false;
  taskDetails!:Task;
  taskDesc!:string;
  task=new Task()
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


  updateTaskDescription(){
    const value=this.updatedescription.nativeElement.value;
    console.log(value)
    this.task.description=value;
    console.log(this.task.description)
    this.taskService.updateTaskDescription(this.getId(),this.task).subscribe(data=>{
      console.log(data);
    })

    setTimeout(function(){
      window.location.reload();
    }, 900);
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Updated Successfully',
      showConfirmButton: false,
      timer: 1500
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
        this.taskService.deleteTask(taskId).subscribe(data => {

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

    })
    }
    setTaskDetails(task:Task){
      this.taskDetails=task;
      this.taskDesc=this.taskDetails.description;
      console.log(this.taskDesc)
     window.localStorage.setItem('des',this.taskDesc)
      window.localStorage.setItem('id',this.taskDetails.id+"")
    }
    getTaskDetails():string
    {
    return window.localStorage.getItem('des') as string;
    }
   getId():string{
     return window.localStorage.getItem('id') as string;
   }

  showActivity() {
    alert("activity")
  }
}

