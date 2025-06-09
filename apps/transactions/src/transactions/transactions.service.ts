import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from '@app/contracts/transactions/dtos/create-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from '@app/contracts/transactions/transaction.entity';

@Injectable()
export class TransactionsService {
  constructor(@InjectRepository(Transaction) private repo: Repository<Transaction>) { }

  async findOne(id: string) {
    const transaction = await this.repo.findOneBy({ id });
    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }
    return transaction;
  }

  async create(dto: CreateTransactionDto) {
    const transaction = this.repo.create(dto);
    return this.repo.save(transaction);
  }

  async update(id: string, updateData: Partial<Transaction>) {
    const transaction = await this.findOne(id);
    Object.assign(transaction, updateData);
    return this.repo.save(transaction);
  }

  async remove(id: string) {
    const transaction = await this.findOne(id);
    return this.repo.remove(transaction);
  }

  async findByUserId(userId: string) {
    return this.repo.find({
      where: { user: { id: userId } },
      order: { transactionDate: 'DESC' },
    });
  }
}

