import {Task} from "./Task";

export class Attachment {
  id!:number;
  name!:string;
  type!:string;
  data!:string;
  task!:Task;
}
