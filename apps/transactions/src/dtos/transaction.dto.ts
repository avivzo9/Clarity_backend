import { Expose } from 'class-transformer';

export class TransactionDto {
    @Expose()
    id: number;

    @Expose()
    amount: number;

    @Expose()
    description: string;

    @Expose()
    date: Date;
} 