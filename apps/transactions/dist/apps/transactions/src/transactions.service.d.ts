import { Repository } from 'typeorm';
import { Transaction } from './transaction.entity';
import { CreateTransactionDto } from './dtos/create-transaction.dto';
import { User } from 'src/users/user.entity';
export declare class TransactionsService {
    private repo;
    constructor(repo: Repository<Transaction>);
    create(transactionDto: CreateTransactionDto, user: User): Promise<Transaction>;
    findAll(user: User): Promise<Transaction[]>;
    findOne(id: string, user: User): Promise<Transaction>;
    update(id: string, attrs: Partial<Transaction>, user: User): Promise<Transaction>;
    remove(id: string, user: User): Promise<Transaction>;
}
