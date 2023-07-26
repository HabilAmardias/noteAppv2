import { IsNotEmpty, IsString } from "class-validator";

export class deleteNoteDto{
    @IsNotEmpty()
    @IsString()
    noteId:string;
}