import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './transaction.entity';
import { CreateTransactionDto } from './dtos/create-transaction.dto';
import { UpdateTransactionDto } from './dtos/update-transaction.dto';
import { User } from 'src/users/user.entity';

@Injectable()
export class TransactionsService {
    constructor(@InjectRepository(Transaction) private repo: Repository<Transaction>) { }

    create(transactionDto: CreateTransactionDto, user: User) {
        const transaction = this.repo.create(transactionDto);
        transaction.user = user;
        return this.repo.save(transaction);
    }

    findAll(user: User) {
        return this.repo.find({ where: { user: { id: user.id } } });
    }

    async findOne(id: string, user: User) {
        if (!id) {
            return null;
        }
        return this.repo.findOne({ where: { id: parseInt(id), user: { id: user.id } } });
    }

    async update(id: string, attrs: Partial<Transaction>, user: User) {
        const transaction = await this.findOne(id, user);
        if (!transaction) {
            throw new NotFoundException('transaction not found');
        }
        Object.assign(transaction, attrs);
        return this.repo.save(transaction);
    }

    async remove(id: string, user: User) {
        const transaction = await this.findOne(id, user);
        if (!transaction) {
            throw new NotFoundException('transaction not found');
        }
        return this.repo.remove(transaction);
    }
} 