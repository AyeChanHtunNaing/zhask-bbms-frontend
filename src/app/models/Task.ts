import { Board } from "./board";
import { TaskList } from "./tasklist";
import { User } from "./user";

export class Task {
  id!: number;
  description !: string;
  taskList!:TaskList;
  board!:Board;
  users:Array<User>=[];
}
