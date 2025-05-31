import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTransactionDto } from './dtos/create-transaction.dto';
import { Transaction } from './transaction.entity';
import { User } from 'src/users/user.entity';
import { GetTransactionDto } from './dtos/get-transaction.dto';

@Injectable()
export class TransactionsService {

    constructor(@InjectRepository(Transaction) private repo: Repository<Transaction>) { }

    create(transactionDto: CreateTransactionDto, user: User) {
        const transaction = this.repo.create(transactionDto);

        transaction.user = user;

        return this.repo.save(transaction);
    }

    createBulk(transactionsDto: CreateTransactionDto[], user: User) {
        const transactions = transactionsDto.map(dto => {
            const transaction = this.repo.create(dto);
            transaction.user = user;
            return transaction;
        });

        return this.repo.save(transactions);
    }

    getTransactions(query: GetTransactionDto) {
        const qb = this.repo.createQueryBuilder('t');

        if (query.category) {
            qb.andWhere('category = :category', { category: query.category });
        }
        if (query.transactionDate) {
            qb.andWhere('transactionDate = :transactionDate', { transactionDate: query.transactionDate });
        }
        if (query.description) {
            qb.andWhere('description = :description', { description: query.description });
        }
        if (query.transactionAmount) {
            qb.andWhere('transactionAmount = :transactionAmount', { transactionAmount: query.transactionAmount });
        }
        if (query.billingAmount) {
            qb.andWhere('billingAmount = :billingAmount', { billingAmount: query.billingAmount });
        }
        if (query.notes) {
            qb.andWhere('notes = :notes', { notes: query.notes });
        }
        if (query.isCash !== undefined) {
            qb.andWhere('isCash = :isCash', { isCash: query.isCash });
        }
        if (query.isExternal !== undefined) {
            qb.andWhere('isExternal = :isExternal', { isExternal: query.isExternal });
        }

        return qb
            .andWhere('approved = true')
            .orderBy('transactionDate', 'DESC')
            .getMany();
    }

    async changeApproval(id: string, approved: boolean) {
        const report = await this.repo.findOneBy({ id });

        if (!report) throw new NotFoundException('Transaction not found');

        report.approved = approved;
        return this.repo.save(report);
    }

    remove(ids: string | string[]) {
        return this.repo.delete(ids);
    }
}