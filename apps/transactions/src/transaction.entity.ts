import { AfterInsert, AfterRemove, AfterUpdate, Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '@app/users';

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    amount: number;

    @Column()
    description: string;

    @Column()
    date: Date;

    @ManyToOne(() => User, (user) => user.transactions)
    user: User;

    @AfterInsert()
    logInsert() {
        console.log('Inserted Transaction with id', this.id);
    }

    @AfterUpdate()
    logUpdate() {
        console.log('Updated Transaction with id', this.id);
    }

    @AfterRemove()
    logRemove() {
        console.log('Removed Transaction with id', this.id);
    }
} 