import { ClientKafka } from '@nestjs/microservices';
import { CreateUserDto } from '@app/users';
import { UsersService } from '@app/users';
import { UpdateUserDto } from '@app/users';
import { AuthService } from './auth.service';
import { User } from '@app/users';
import { Signin } from './dtos/signin.dto';
export declare class UsersController {
    private usersSrv;
    private authSrv;
    private kafkaClient;
    constructor(usersSrv: UsersService, authSrv: AuthService, kafkaClient: ClientKafka);
    handleSignup(body: CreateUserDto): Promise<import("./user.entity").User>;
    handleSignin(body: Signin): Promise<import("./user.entity").User>;
    handleCurrentUser(data: any): Promise<any>;
    handleSignout(data: any): Promise<boolean>;
    createUser(body: CreateUserDto, session: any): Promise<import("./user.entity").User>;
    signin(body: Signin, session: any): Promise<import("./user.entity").User>;
    currentUser(user: User): User;
    signout(session: any): boolean;
    findUser(id: string): Promise<User>;
    getAllUsers(email: string): Promise<User[]>;
    updateUser(id: string, body: UpdateUserDto): Promise<User>;
    removeUser(id: string): Promise<User>;
}
//# sourceMappingURL=users.controller.d.ts.map