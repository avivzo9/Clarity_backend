import { AfterInsert, AfterRemove, AfterUpdate, Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Category } from '@app/categories';
import { Transaction } from '@app/transactions';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({ default: false })
    isAdmin: boolean;

    @OneToMany(() => Category, (category) => category.user)
    categories: Category[];

    @OneToMany(() => Transaction, (transaction) => transaction.user)
    transactions: Transaction[];

    @AfterInsert()
    logInsert() {
        console.log('Inserted User with id', this.id);
    }

    @AfterUpdate()
    logUpdate() {
        console.log('Updated User with id', this.id);
    }

    @AfterRemove()
    logRemove() {
        console.log('Removed User with id', this.id);
    }
} 