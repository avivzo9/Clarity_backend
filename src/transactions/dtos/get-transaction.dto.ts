import { Transform } from "class-transformer";
import { IsBoolean, IsDateString, IsNumber, IsOptional, IsString } from "class-validator";

export class GetTransactionDto {
    @IsOptional()
    @IsDateString()
    transactionDate: Date;

    @IsOptional()
    @IsString()
    description: string;

    @IsOptional()
    @IsString()
    category: string;

    @IsOptional()
    @Transform(({ value }) => parseFloat(value))
    @IsNumber()
    transactionAmount: number;

    @IsOptional()
    @Transform(({ value }) => parseFloat(value))
    @IsNumber()
    billingAmount: number;

    @IsOptional()
    @IsString()
    notes: string;

    @IsOptional()
    @Transform(({ value }) => value === 'true')
    @IsBoolean()
    isCash: boolean;

    @IsOptional()
    @Transform(({ value }) => value === 'true')
    @IsBoolean()
    isExternal: boolean;
}