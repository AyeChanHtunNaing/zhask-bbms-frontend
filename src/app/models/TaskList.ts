import { Board } from "./board";

export class TaskList {
  id !: number;
  title !: string ;
  description !: string;
  deleteStatus !: boolean;
  board !: Board;
}
