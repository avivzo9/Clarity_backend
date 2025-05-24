import { CallHandler, ExecutionContext, Injectable, NestInterceptor, UseInterceptors } from "@nestjs/common";
import { Observable } from "rxjs";
import { UsersService } from "../users.service";

export const UseCurrentUser = () => UseInterceptors(CurrentUserInterceptor);

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {

    constructor(private usersSrv: UsersService) { }

    async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>> {
        const req = context.switchToHttp().getRequest();
        const { userId } = req.session || {};

        if (userId) {
            const user = await this.usersSrv.findOne(userId);
            req.currentUser = user;
        }

        return next.handle();
    }
}