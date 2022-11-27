import { User } from "./user";

export class NotificationModel{
  id!:number;
  status!:string;
  content!:string;
  createAt!:Date;
  user!:Array<User>;
}
