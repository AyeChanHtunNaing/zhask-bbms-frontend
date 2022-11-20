import {Component, ElementRef, Input, OnInit, TemplateRef, ViewChild} from "@angular/core";
import { Task } from "../models/Task";
import { TaskService } from "../services/task.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";
import {MdbModalRef, MdbModalService} from "mdb-angular-ui-kit/modal";
import {ActivityComponent} from "../activity/activity.component";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";

@Component({
  selector: "app-card",
  templateUrl: "./task.component.html",
  styleUrls: ["./task.component.css"],
})
export class CardComponent implements OnInit {
  @Input() card!: Task;
  @Input() title!:string;
  updateDescription=this.getTaskDetails();
  isView: boolean=false;
  taskDetails!:Task;
  taskDesc!:string;
  task=new Task();
  editForm!:FormGroup;
  taskName=this.getTaskDetails()
  newTask!:string;
  modalRef!: BsModalRef;
  constructor(private modalService: BsModalService,private taskService:TaskService,private fb:FormBuilder) {
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
    const value=this.updateDescription;
    console.log(value);
    this.task.description=value;
    console.log(this.task.description);
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
    });
    this.task.description="";
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

        });
        Swal.fire(
          'Deleted!',
          'Your task has been deleted.',
          'success'
        )
        setTimeout(function(){
          window.location.reload();
        }, 1000);
      }});
  }
  setTaskDetails(task:Task){
    this.taskDetails=task;
    this.taskDesc=this.taskDetails.description;
    console.log(this.taskDesc);
    window.localStorage.setItem('des',this.taskDesc);
    window.localStorage.setItem('id',this.taskDetails.id+"");
  }
  getTaskDetails():string{
    return window.localStorage.getItem('des') as string;
  }

  getId():string{
    return window.localStorage.getItem('id') as string;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template,{ class: 'modal-lg'});
  }
  addActivity(subtask:string){

  }
}

