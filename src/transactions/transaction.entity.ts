import { IsOptional } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    transactionDate: Date;

    @Column()
    description: string;

    @Column()
    category: string;

    @Column("decimal")
    transactionAmount: number;

    @Column("decimal")
    billingAmount: number;

    @Column({ nullable: true })
    @IsOptional()
    notes: string;

    @Column({ default: false })
    @IsOptional()
    isCash: boolean;

    @Column({ default: false })
    @IsOptional()
    isExternal: boolean;
}