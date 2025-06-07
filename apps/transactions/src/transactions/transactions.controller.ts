import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TransactionsService } from './transactions.service';
import { KAFKA_TOPICS, TransactionEvent } from '@clarity/interfaces';

@Controller()
export class TransactionsController {
    constructor(private readonly transactionsService: TransactionsService) { }

    @MessagePattern(KAFKA_TOPICS.TRANSACTION.CREATED)
    async handleTransactionCreated(@Payload() data: TransactionEvent) {
        return this.transactionsService.handleTransactionCreated(data);
    }

    @MessagePattern(KAFKA_TOPICS.TRANSACTION.UPDATED)
    async handleTransactionUpdated(@Payload() data: TransactionEvent) {
        return this.transactionsService.handleTransactionUpdated(data);
    }

    @MessagePattern(KAFKA_TOPICS.TRANSACTION.DELETED)
    async handleTransactionDeleted(@Payload() data: TransactionEvent) {
        return this.transactionsService.handleTransactionDeleted(data);
    }
} 