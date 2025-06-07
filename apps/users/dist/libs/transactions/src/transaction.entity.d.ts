import { User } from '@app/users';
export declare class Transaction {
    id: number;
    amount: number;
    description: string;
    date: Date;
    user: User;
    logInsert(): void;
    logUpdate(): void;
    logRemove(): void;
}
//# sourceMappingURL=transaction.entity.d.ts.map