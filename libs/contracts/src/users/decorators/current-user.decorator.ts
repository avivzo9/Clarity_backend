import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const CurrentUser = createParamDecorator((_: never, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest();
    return req.currentUser;
});