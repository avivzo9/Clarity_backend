import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from '@app/contracts/transactions/dtos/create-transaction.dto';
import { Transaction } from '@app/contracts/transactions/transaction.entity';

@Controller()
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) { }

  @MessagePattern('get_transaction')
  async getTransaction(@Payload() data: { id: string }) {
    return this.transactionsService.findOne(data.id);
  }

  @MessagePattern('create_transaction')
  async createTransaction(@Payload() data: CreateTransactionDto) {
    return this.transactionsService.create(data);
  }

  @MessagePattern('update_transaction')
  async updateTransaction(@Payload() data: { id: string; updateData: Partial<Transaction> }) {
    return this.transactionsService.update(data.id, data.updateData);
  }

  @MessagePattern('delete_transaction')
  async deleteTransaction(@Payload() data: { id: string }) {
    return this.transactionsService.remove(data.id);
  }

  @MessagePattern('get_user_transactions')
  async getUserTransactions(@Payload() data: { userId: string }) {
    return this.transactionsService.findByUserId(data.userId);
  }
}
