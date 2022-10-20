import { Workspace } from "./workspace";

export class Board{
    id !: number;
    name !: string;
    description !: string;
    createAt !: Date;
    workSpace !: Workspace;
}