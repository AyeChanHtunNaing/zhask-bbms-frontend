import { Task } from "../models/Task";
import { User } from "../models/user";

export class CommentInterface {
  id!: string;
  content!: string;
  user!:User;
  task!:Task; 
  parentId!: null | string;
  createdAt!: string;
}
