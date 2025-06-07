import { TransactionEvent } from '@clarity/interfaces';
export declare class TransactionsService {
    private readonly logger;
    handleTransactionCreated(data: TransactionEvent): Promise<{
        success: boolean;
        data: TransactionEvent;
    }>;
    handleTransactionUpdated(data: TransactionEvent): Promise<{
        success: boolean;
        data: TransactionEvent;
    }>;
    handleTransactionDeleted(data: TransactionEvent): Promise<{
        success: boolean;
        data: TransactionEvent;
    }>;
}
