import { Expose } from "class-transformer";

export class UserDto {
    @Expose()
    id: number;
    @Expose()
    firstname: string;
    @Expose()
    lastname: string;
    @Expose()
    email: string;
}