import { Transform } from "class-transformer";
import { IsBoolean, IsDateString, IsNumber, IsOptional, IsString } from "class-validator";

export class GetTransactionDto {
    @IsDateString()
    @IsOptional()
    transactionDate: Date;

    @IsString()
    @IsOptional()
    description: string;

    @IsString()
    @IsOptional()
    category: string;

    @Transform(({ value }) => parseFloat(value))
    @IsNumber()
    @IsOptional()
    transactionAmount: number;

    @Transform(({ value }) => parseFloat(value))
    @IsNumber()
    @IsOptional()
    billingAmount: number;

    @IsString()
    @IsOptional()
    notes: string;

    @Transform(({ value }) => value === 'true')
    @IsBoolean()
    @IsOptional()
    isCash: boolean;

    @Transform(({ value }) => value === 'true')
    @IsBoolean()
    @IsOptional()
    isExternal: boolean;
}