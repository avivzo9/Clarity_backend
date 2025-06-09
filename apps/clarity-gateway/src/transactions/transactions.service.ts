import { Injectable, OnModuleInit, Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Transaction } from '@app/contracts/transactions/transaction.entity';
import { CreateTransactionDto } from '@app/contracts/transactions/dtos/create-transaction.dto';
import { UpdateTransactionDto } from '@app/contracts/transactions/dtos/update-transaction.dto';

@Injectable()
export class TransactionsService implements OnModuleInit {
    constructor(
        @Inject('TRANSACTIONS_SERVICE') private readonly transactionsClient: ClientKafka,
    ) { }

    async onModuleInit() {
        const requestPatterns = [
            { cmd: 'create_transaction' },
            { cmd: 'get_transaction' },
            { cmd: 'get_all_transactions' },
            { cmd: 'update_transaction' },
            { cmd: 'delete_transaction' },
            { cmd: 'get_user_transactions' },
        ];

        requestPatterns.forEach(pattern => {
            this.transactionsClient.subscribeToResponseOf(pattern);
        });

        try {
            await this.transactionsClient.connect();

            // Create topics
            const admin = this.transactionsClient.createClient().admin();
            const topics = [
                'create_transaction',
                'create_transaction.reply',
                'get_transaction',
                'get_transaction.reply',
                'get_all_transactions',
                'get_all_transactions.reply',
                'update_transaction',
                'update_transaction.reply',
                'delete_transaction',
                'delete_transaction.reply',
                'get_user_transactions',
                'get_user_transactions.reply'
            ];

            await admin.createTopics({
                topics: topics.map(topic => ({
                    topic,
                    numPartitions: 1,
                    replicationFactor: 1,
                })),
            });
        } catch (error) {
            console.error('Failed to connect to Kafka:', error);
        }
    }

    async findOne(id: number): Promise<Transaction> {
        return this.transactionsClient.send({ cmd: 'get_transaction' }, { id }).toPromise();
    }

    async create(createTransactionDto: CreateTransactionDto): Promise<Transaction> {
        return this.transactionsClient.send({ cmd: 'create_transaction' }, createTransactionDto).toPromise();
    }

    async update(id: number, updateTransactionDto: UpdateTransactionDto): Promise<Transaction> {
        return this.transactionsClient.send({ cmd: 'update_transaction' }, { id, ...updateTransactionDto }).toPromise();
    }

    async remove(id: number): Promise<void> {
        return this.transactionsClient.send({ cmd: 'delete_transaction' }, { id }).toPromise();
    }

    async findByUserId(userId: number): Promise<Transaction[]> {
        return this.transactionsClient.send({ cmd: 'get_user_transactions' }, { userId }).toPromise();
    }

    async findAll(): Promise<Transaction[]> {
        return this.transactionsClient.send({ cmd: 'get_all_transactions' }, {}).toPromise();
    }
} 