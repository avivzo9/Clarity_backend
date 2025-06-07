import { CanActivate, ExecutionContext } from '@nestjs/common';
import { UsersService } from '@app/users';
export declare class AuthGuard implements CanActivate {
    private usersService;
    constructor(usersService: UsersService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
