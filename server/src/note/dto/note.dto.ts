import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class NoteDto{
    @IsString()
    @IsNotEmpty()
    noteTitle:string;

    @IsString()
    @IsOptional()
    noteDesc?:string;
}