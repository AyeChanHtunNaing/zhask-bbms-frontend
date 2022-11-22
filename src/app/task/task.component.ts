import {Component, Input, OnInit, TemplateRef} from "@angular/core";
import { Task } from "../models/Task";
import { TaskService } from "../services/task.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {Activity} from "../models/activity";
import {ActivityService} from "../services/activity.service";
import {Observable} from "rxjs";
import {AttachmentService} from "../services/attachment.service";
import {HttpEventType, HttpResponse} from "@angular/common/http";
import {Attachment} from "../models/attachment";
import { Comment } from "../models/comment";
import { User } from "../models/user";
import { UserService } from "../services/user.service";

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
  task=new Task();
  activity=new Activity();
  editForm!:FormGroup;
  taskName=this.getTaskDetails()
  activities!: Activity[] ;
  modalRef!: BsModalRef;
  comment : Comment = new Comment();
  comments : Comment [] = [];
  users: User[] = [];
  user: User = new User();
  userId!:number;
  /* attachment */
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  fileInfos?: Observable<any>;
  attachment=new Attachment()
  constructor(private modalService: BsModalService,private attachmentService:AttachmentService,private activityService:ActivityService,private taskService:TaskService,private fb:FormBuilder,private userService : UserService) {
    this.editForm=this.fb.group({
      taskDesc:['',[Validators.required]],
    });

  }
  ngOnInit() {
    this.writeComment();
    this.userId=this.getUserId() as number;
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
  updateTaskDescription() {
    const value = this.taskDetails.description;
    console.log(value);
    this.task.description = value;
    this.taskService.updateTaskDescription(this.getId(),this.task).subscribe(data=>{
      console.log(data);
    })
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Updated Successfully',
      showConfirmButton: false,
      timer: 1500
    });
    window.location.reload()
    this.ngOnInit()
  }
  updateTask(){
    alert("reach")
    this.task.content=this.taskDetails.content;
    this.task.description=this.taskDetails.description;
    this.task.board=this.taskDetails.board;
    this.task.taskList=this.taskDetails.taskList;
    this.task.createdBy=this.taskDetails.createdBy;
    this.task.startDate=this.taskDetails.startDate;
    this.task.endDate=this.taskDetails.endDate
    this.taskService.updateTask(this.getId(),this.task).subscribe(data=>{
      console.log(data);
    })


    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Updated Successfully',
      showConfirmButton: false,
      timer: 1500
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

  getUserId(): number | null {
    return window.localStorage.getItem('userId') as number | null;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template,{ class: 'modal-lg'});
  }
  
  addActivity(){
    console.log(this.taskDetails.id)
    this.activity.task=this.taskDetails;
    this.activityService.createActivity(this.activity)
      .subscribe(res => {
          this.activity.name="";
          this.modalRef.hide();
          this.getAllActivities()
        });
  }

  getAllActivities(){

      this.activityService.getAllActivities(Number(this.getId())).subscribe(data => {
        this.activities = data;
        console.log(this.getId())
      });

  }
  changed(event, activity:Activity) {
    console.log(event.target.checked)
    if (event.target.checked == true) {
      activity.checked=true
      this.activityService.setActivity(activity.id,activity).subscribe(date=>{
      });
      this.activityService.setTaskList(Number(this.getId()),activity).subscribe(data=>{

      });
    }else{
      activity.checked=false
      this.activityService.setActivity(activity.id,activity).subscribe(date=>{
      });
    }
  }

  checkActivity(item: Activity) {
    console.log(item.checked)
    let check = false;
    if (item.checked) {
      check = true;
    }
    return check;
  }
  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }
  upload(): void {
    this.attachment.task=this.taskDetails;
    //console.log(this.taskDetails)
    this.progress = 0;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;

        this.attachmentService.upload(this.currentFile,this.attachment).subscribe({
          next: (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              this.fileInfos = this.attachmentService.getFiles(this.taskDetails.id);
            }
          },
          error: (err: any) => {
            console.log(err);
            this.progress = 0;

            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the file!';
            }

            this.currentFile = undefined;
          }
        });
      }

      this.selectedFiles = undefined;
    }
  }
  getFilebyId(task:Task){
    this.fileInfos = this.attachmentService.getFiles(task.id);
  }

  writeComment(){

   this.task.id=Number(this.getId());
    console.log(this.comment.content);
    this.user.id=this.getUserId() as number; 
    this.comment.task=this.task;
    this.users.push(this.user);
    this.comment.users=this.users;
    // this.commentService.writeComment(this.comment).subscribe(data=>{    
      
    // });
    // this.commentService.getCommentByTaskId(Number(this.getId())).subscribe(data=>{
    //   this.comments=data;
    // });
  }
}

