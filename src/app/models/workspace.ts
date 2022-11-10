import { User } from "./user";

export class Workspace {
 id!:number;
 name !: string;
 description !: string;
 users:Array<User>=[];
}

