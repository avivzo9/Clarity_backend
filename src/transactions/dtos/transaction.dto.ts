import { Expose, Transform } from "class-transformer";
import { User } from "src/users/user.entity";

export class TransactionDto {

    @Expose()
    id: string;

    @Expose()
    transactionDate: Date;

    @Expose()
    description: string;

    @Expose()
    category: string;

    @Expose()
    transactionAmount: number;

    @Expose()
    billingAmount: number;

    @Expose()
    createdAt: Date;

    @Expose()
    notes: string;

    @Expose()
    isCash: boolean;

    @Expose()
    isExternal: boolean;

    @Expose()
    approved: boolean;

    @Transform(({ obj }) => obj.user.id)
    @Expose()
    userId: string;
}