import { IsNotEmpty, IsString } from "class-validator";

export class NoteDto{
    @IsNotEmpty()
    @IsString()
    noteTitle:string;

    @IsString()
    noteDesc:string;
}