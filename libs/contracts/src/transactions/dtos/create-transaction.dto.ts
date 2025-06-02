import { IsBoolean, IsDateString, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateTransactionDto {
    @IsDateString()
    transactionDate: Date;

    @IsString()
    description: string;

    @IsString()
    category: string;

    @IsNumber()
    @IsOptional()
    transactionAmount: number;

    @IsNumber()
    billingAmount: number;

    @IsString()
    @IsOptional()
    notes: string;

    @IsBoolean()
    @IsOptional()
    isCash: boolean;

    @IsBoolean()
    @IsOptional()
    isExternal: boolean;
}