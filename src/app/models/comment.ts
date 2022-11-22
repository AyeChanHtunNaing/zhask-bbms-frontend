import { Task } from "./Task";
import { User } from "./user";

export class Comment{
    content!:string;
    createAt!:Date;
    task!:Task;   
    users!:Array<User>;

}