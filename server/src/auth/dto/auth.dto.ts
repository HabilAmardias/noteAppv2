import { IsString, IsNotEmpty, Length } from "class-validator";

export class AuthDto{
    @IsNotEmpty()
    @IsString()
    @Length(5,12)
    username: string;

    @IsNotEmpty()
    @IsString()
    @Length(8,20)
    password: string;
}