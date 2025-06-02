import { IsEmail, IsString } from "class-validator";

export class Signin {
    @IsEmail()
    email: string;
    @IsString()
    password: string;
}