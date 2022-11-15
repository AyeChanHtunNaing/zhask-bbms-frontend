import { User } from "./user";

export class Workspace {
 id!:number;
 name !: string;
 description !: string;
 createdBy!:string;
 users:Array<User>=[];
 marked!:boolean;
}

