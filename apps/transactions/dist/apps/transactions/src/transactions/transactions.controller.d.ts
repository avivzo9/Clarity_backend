import { TransactionsService } from './transactions.service';
import { TransactionEvent } from '@clarity/interfaces';
export declare class TransactionsController {
    private readonly transactionsService;
    constructor(transactionsService: TransactionsService);
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
