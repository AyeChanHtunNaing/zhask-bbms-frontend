import { User } from "./user";
import { Workspace } from "./workspace";

export class Board{
    id !: number;
    name !: string;
    description !: string;
    createdBy !:string;
    createAt !: Date;
    workSpace !: Workspace;
    users:Array<User>=[];
    marked!:boolean;
}
