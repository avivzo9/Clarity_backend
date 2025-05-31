import { Category } from "src/categories/category.entity";
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

    @Column({ default: false })
    isAdmin: boolean;

    @OneToMany(() => Transaction, t => t.user)
    transactions: Transaction[];

    @OneToMany(() => Category, c => c.user)
    categories: Category[];

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