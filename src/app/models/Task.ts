import { Board } from "./board";
import { TaskList } from "./TaskList";

export class Task {
  id!: number;
  description !: string;
  taskList!:TaskList;
  board!:Board;
}
