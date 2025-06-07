import { IsNumber, IsString, IsDate } from 'class-validator';

export class CreateTransactionDto {
    @IsNumber()
    amount: number;

    @IsString()
    description: string;

    @IsDate()
    date: Date;
} 