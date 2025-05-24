import { IsBoolean } from "class-validator";

export class ApproveTransactionDto {
    @IsBoolean()
    approved: boolean;
}