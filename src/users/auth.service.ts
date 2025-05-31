import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UsersService } from "./users.service";
import { Password } from "./password.service";
import { CreateUserDto } from "./dtos/create-user.dto";
import { Signin } from "./dtos/signin.dto";

@Injectable()
export class AuthService {

    constructor(private usersSrv: UsersService) { }

    async signup(data: CreateUserDto) {
        const users = await this.usersSrv.find(data.email);

        if (users.length) throw new BadRequestException('Email in use');

        data.password = await Password.toHash(data.password);

        return await this.usersSrv.create(data);
    }

    async signin(data: Signin) {
        const [user] = await this.usersSrv.find(data.email);

        if (!user) throw new NotFoundException('User not found');

        const res = await Password.compare(user.password, data.password);

        if (!res) throw new BadRequestException('User not found')

        return user;
    }
}