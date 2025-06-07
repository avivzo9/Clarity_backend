import { Category } from '@app/categories';
import { Transaction } from '@app/transactions';
export declare class User {
    id: number;
    email: string;
    password: string;
    categories: Category[];
    transactions: Transaction[];
    logInsert(): void;
    logUpdate(): void;
    logRemove(): void;
}
