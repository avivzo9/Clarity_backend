import { AfterInsert, AfterRemove, AfterUpdate, Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '@app/users';

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @ManyToOne(() => User, (user) => user.categories)
    user: User;

    @AfterInsert()
    logInsert() {
        console.log('Inserted Category with id', this.id);
    }

    @AfterUpdate()
    logUpdate() {
        console.log('Updated Category with id', this.id);
    }

    @AfterRemove()
    logRemove() {
        console.log('Removed Category with id', this.id);
    }
} 