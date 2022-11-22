import { Component, Input, OnInit } from '@angular/core';
import { User } from '../models/user';
import { CommentsService } from '../services/comments.service';
import { ActiveCommentInterface } from '../types/activeComment.interface';
import { CommentInterface } from '../types/comment.interface';


@Component({
  selector: 'comments',
  templateUrl: './comments.component.html',
})
export class CommentsComponent implements OnInit {
  @Input() currentUserId!: number;

  comments: CommentInterface[] = [];
  user:User=new User();
  comment:CommentInterface=new CommentInterface();
  activeComment: ActiveCommentInterface | null = null;

  constructor(private commentsService: CommentsService) {}

  ngOnInit(): void {
    this.commentsService.getComments().subscribe((comments) => {
      this.comments = comments;
    });
  }

  getRootComments(): CommentInterface[] {
    return this.comments.filter((comment) => comment.parentId === null);
  }

  updateComment({
    text,
    commentId,
  }: {
    text: string;
    commentId: string;
  }): void {
    this.commentsService
      .updateComment(commentId, text)
      .subscribe((updatedComment) => {
        this.comments = this.comments.map((comment) => {
          if (comment.id === commentId) {
            return updatedComment;
          }
          return comment;
        });

        this.activeComment = null;
      });
  }

  deleteComment(commentId: string): void {
    this.commentsService.deleteComment(commentId).subscribe(() => {
      this.comments = this.comments.filter(
        (comment) => comment.id !== commentId
      );
    });
  }

  setActiveComment(activeComment: ActiveCommentInterface | null): void {
    this.activeComment = activeComment;
  }
  getUserId(): number | null {
    return window.localStorage.getItem('userId') as number | null;
  }
  addComment({
    text,
    parentId,
  }: {
    text: string;
    parentId: string | null;
  }): void {
    this.comment.content=text;
    this.comment.parentId=parentId;
    this.user.id=this.getUserId() as number;
    this.comment.user=this.user;
    this.commentsService
      .createComment(this.comment)
      .subscribe((createdComment) => {
        this.comments = [...this.comments, createdComment];
        this.activeComment = null;
      });
  }

  getReplies(commentId: string): CommentInterface[] {
    return this.comments
      .filter((comment) => comment.parentId === commentId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
  }
}
