import { AfterInsert, AfterRemove, AfterUpdate, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../users/user.entity";

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ default: true })
    approved: boolean;

    @Column()
    transactionDate: Date;

    @Column()
    description: string;

    @Column()
    category: string;

    @Column("decimal", { nullable: true })
    transactionAmount: number;

    @Column("decimal")
    billingAmount: number;

    @Column({ default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @Column({ nullable: true })
    notes: string;

    @Column({ default: false })
    isCash: boolean;

    @Column({ default: false })
    isExternal: boolean;

    @ManyToOne(() => User, u => u.transactions)
    user: User;

    @AfterInsert()
    logInsert() {
        console.log('Inserted transaction:', this.id);
    }

    @AfterUpdate()
    logUpdate() {
        console.log('Updated transaction:', this.id)
    }

    @AfterRemove()
    logRemove() {
        console.log('Removed transaction:', this.id);
    }
}