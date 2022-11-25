import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from '../services/user.service';
import { ActiveCommentInterface } from '../types/activeComment.interface';
import { ActiveCommentTypeEnum } from '../types/activeCommentType.enum';
import { CommentInterface } from '../types/comment.interface';


@Component({
  selector: 'comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() comment!: CommentInterface;
  @Input() activeComment!: ActiveCommentInterface | null;
  @Input() replies!: CommentInterface[];
  @Input() currentUserId!: number;
  @Input() parentId!: string | null;
  pict :any;
  profile: any = File;
  @Output()
  setActiveComment = new EventEmitter<ActiveCommentInterface | null>();
  @Output()
  deleteComment = new EventEmitter<string>();
  @Output()
  addComment = new EventEmitter<{ text: string; parentId: string | null }>();
  @Output()
  updateComment = new EventEmitter<{ text: string; commentId: string }>();

  createdAt: string = '';
  canReply: boolean = false;
  canEdit: boolean = false;
  canDelete: boolean = false;
  activeCommentType = ActiveCommentTypeEnum;
  replyId: string | null = null;
  userName!:string;
  constructor(private userService:UserService)
  {
  
  }
  ngOnInit(): void {
    this.userService.getUserNameByUserId(this.comment.user.id).subscribe(data=>
      {
        this.userName=data.userName;
        const b = window.atob(data.profile);
        const c = new ArrayBuffer(b.length);
        const z = new Uint8Array(c);
        for(let i = 0 ; i < b.length ;i++){
          z[i] = b.charCodeAt(i);
        }
        console.log(data)
        console.log(data.pictureName+" "+data.profile);
        const blob = new Blob([z],{type: 'image/jpeg'})
        const file = new File([blob],data.pictureName || '',{type:'image/jpeg'})
        this.profile = file;
        var read = new FileReader();
        read.readAsDataURL(file);
        read.onload=(event : any)=>{
          this.pict = event.target.result;
        }
      });
      const fiveMinutes = 300000;
      const timePassed =
      new Date().getMilliseconds() -
      new Date(this.comment.createAt).getMilliseconds() >
      fiveMinutes;
      this.createdAt = new Date(this.comment.createAt).toLocaleDateString();
      this.canReply = Boolean(this.currentUserId);
      this.canEdit = this.currentUserId == this.comment.user.id && !timePassed;
      this.canDelete =
      this.currentUserId == this.comment.user.id &&
      this.replies.length == 0 && !timePassed;
      this.replyId = this.parentId ? this.parentId : this.comment.id;
  }

  isReplying(): boolean {
    if (!this.activeComment) {
      return false;
    }
    return (
      this.activeComment.id == this.comment.id &&
      this.activeComment.type == this.activeCommentType.replying
    );
  }

  isEditing(): boolean {
    if (!this.activeComment) {
      return false;
    }
    return (
      this.activeComment.id == this.comment.id &&
      this.activeComment.type == 'editing'
    );
  }
}
