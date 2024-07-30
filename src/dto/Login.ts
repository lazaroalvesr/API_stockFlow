import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginDTO {

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsString()
    senha: string
}