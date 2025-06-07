import { IsNumber, IsString, IsDate, IsOptional } from 'class-validator';

export class UpdateTransactionDto {
    @IsNumber()
    @IsOptional()
    amount?: number;

    @IsString()
    @IsOptional()
    description?: string;

    @IsDate()
    @IsOptional()
    date?: Date;
} 