import { Workspace } from "./workspace";

export class Board{
    id !: number;
    name !: string;
    description !: string;
    countOfTask !: number;
    createAt !: Date;
    workSpace !: Workspace;
}