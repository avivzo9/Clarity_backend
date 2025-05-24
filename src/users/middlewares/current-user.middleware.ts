import { Request, Response, NextFunction } from "express";
import { UsersService } from "../users.service";
import { Injectable, NestMiddleware } from "@nestjs/common";
import { User } from "../user.entity";

declare global {
    namespace Express {
        interface Request {
            currentUser?: User; // Adjust the type as per your user model
        }
    }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {

    constructor(private readonly usersSrv: UsersService) { }

    async use(req: Request, _: Response, next: NextFunction) {
        const { userId } = req.session || {};

        if (userId) {
            const user = await this.usersSrv.findOne(userId);

            if (user) req.currentUser = user;
        }

        next();
    }
}    