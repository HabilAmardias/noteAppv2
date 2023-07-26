import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class EditNoteDto{
    @IsString()
    @IsOptional()
    noteTitle?:string;

    @IsString()
    @IsOptional()
    noteDesc?:string;
}