import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTransactionDto } from './dtos/create-transaction.dto';
import { Transaction } from './transaction.entity';
import { User } from 'src/users/user.entity';

@Injectable()
export class TransactionsService {

    constructor(@InjectRepository(Transaction) private repo: Repository<Transaction>) { }

    create(transactionDto: CreateTransactionDto, user: User) {
        const transaction = this.repo.create(transactionDto);

        transaction.user = user;
        transaction.createdAt = new Date();

        return this.repo.save(transaction);
    }

    async changeApproval(id: string, approved: boolean) {
        const report = await this.repo.findOneBy({ id });

        if (!report) throw new NotFoundException('Transaction not found');

        report.approved = approved;
        return this.repo.save(report);
    }
}