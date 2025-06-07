import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { UsersService } from '@app/users';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private usersService: UsersService) { }

    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const { session } = request;

        if (!session?.userId) {
            return false;
        }

        const user = await this.usersService.findOne(session.userId);
        if (!user) {
            return false;
        }

        request.currentUser = user;
        return true;
    }
} 