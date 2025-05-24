import { CallHandler, ExecutionContext, NestInterceptor, UseInterceptors } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { map, Observable } from "rxjs";

interface ClassConstructor {
    new(...args: any[]): {};
}

export const UseSerialize = (dto: ClassConstructor) => UseInterceptors(new SerializeInterceptor(dto));

export class SerializeInterceptor implements NestInterceptor {

    constructor(private dto: ClassConstructor) { }

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
        // Run before a req is handled


        return next.handle().pipe(
            map(data => {
                // Run before a res is sent
                return plainToInstance(this.dto, data, {
                    excludeExtraneousValues: true
                })
            })
        )
    }
}