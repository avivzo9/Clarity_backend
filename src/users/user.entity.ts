import { Transaction } from "src/transactions/transaction.entity";
import { AfterInsert, AfterRemove, AfterUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({ default: true })
    isAdmin: boolean;

    @OneToMany(() => Transaction, t => t.user)
    transactions: Transaction[];

    @AfterInsert()
    logInsert() {
        console.log('Inserted user:', this.id);
    }

    @AfterUpdate()
    logUpdate() {
        console.log('Updated user:', this.id)
    }

    @AfterRemove()
    logRemove() {
        console.log('Removed user:', this.id);
    }
}