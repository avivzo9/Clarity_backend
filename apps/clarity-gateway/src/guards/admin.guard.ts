import { CanActivate, ExecutionContext } from "@nestjs/common";

export class AdminGuard implements CanActivate {

    canActivate(context: ExecutionContext): boolean {
        const req = context.switchToHttp().getRequest();
        return req.currentUser?.isAdmin;
    }
}