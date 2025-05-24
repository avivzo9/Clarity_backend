import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTransactionDto } from './dtos/create-transaction.dto';
import { Transaction } from './transaction.entity';

@Injectable()
export class TransactionsService {

    constructor(@InjectRepository(Transaction) private repo: Repository<Transaction>) { }

    create(transactionDto: CreateTransactionDto) {
        const transaction = this.repo.create(transactionDto);

        return this.repo.save(transaction);
    }
}