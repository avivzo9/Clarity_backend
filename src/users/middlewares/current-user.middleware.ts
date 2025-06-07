import { Request, Response, NextFunction } from "express";
import { UsersService } from "../users.service";
import { Injectable, NestMiddleware } from "@nestjs/common";
import { User } from "../user.entity";

declare module 'express' {
    interface Request {
        currentUser?: User;
        session?: {
            userId?: string;
        };
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