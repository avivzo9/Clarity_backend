import { CreateTransactionDto } from './dtos/create-transaction.dto';
import { TransactionsService } from './transactions.service';
import { UpdateTransactionDto } from './dtos/update-transaction.dto';
import { User } from '@app/users';
export declare class TransactionsController {
    private transactionsService;
    constructor(transactionsService: TransactionsService);
    handleCreate(body: any): Promise<import("./transaction.entity").Transaction>;
    handleFindAll(body: any): Promise<import("./transaction.entity").Transaction[]>;
    handleFindOne(body: any): Promise<import("./transaction.entity").Transaction>;
    handleUpdate(body: any): Promise<import("./transaction.entity").Transaction>;
    handleRemove(body: any): Promise<import("./transaction.entity").Transaction>;
    createTransaction(body: CreateTransactionDto, user: User): Promise<import("./transaction.entity").Transaction>;
    getTransactions(user: User): Promise<import("./transaction.entity").Transaction[]>;
    getTransaction(id: string, user: User): Promise<import("./transaction.entity").Transaction>;
    updateTransaction(id: string, body: UpdateTransactionDto, user: User): Promise<import("./transaction.entity").Transaction>;
    removeTransaction(id: string, user: User): Promise<import("./transaction.entity").Transaction>;
}
