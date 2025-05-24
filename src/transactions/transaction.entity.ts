import { IsOptional } from "class-validator";
import { User } from "src/users/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ default: false })
    approved: boolean;

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

    @Column()
    createdAt: Date;

    @Column({ nullable: true })
    @IsOptional()
    notes: string;

    @Column({ default: false })
    @IsOptional()
    isCash: boolean;

    @Column({ default: false })
    @IsOptional()
    isExternal: boolean;

    @ManyToOne(() => User, u => u.transactions)
    user: User;
}