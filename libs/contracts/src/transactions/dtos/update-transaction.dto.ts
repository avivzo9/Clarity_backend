import { IsNumber, IsString, IsOptional, IsDate } from 'class-validator';

export class UpdateTransactionDto {
    @IsNumber()
    @IsOptional()
    amount?: number;

    @IsString()
    @IsOptional()
    description?: string;

    @IsNumber()
    @IsOptional()
    categoryId?: number;

    @IsDate()
    @IsOptional()
    timestamp?: Date;
} 