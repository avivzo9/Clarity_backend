import { Body, Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from '../../../../libs/contracts/src/transactions/dtos/create-transaction.dto';
import { UseCurrentUser } from '@app/contracts/users/interceptors/current-user.interceptoor';
import { User } from '@app/contracts/users/user.entity';

@Controller()
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) { }

  @MessagePattern('createTransaction')
  createTransaction(@Body() body: CreateTransactionDto, @UseCurrentUser() user: User) {
    return this.transactionsSrv.create(body, user);
  }

  @MessagePattern('findAllTransactions')
  findAll() {
    return this.transactionsService.findAll();
  }

  @MessagePattern('findOneTransaction')
  findOne(@Payload() id: number) {
    return this.transactionsService.findOne(id);
  }

  @MessagePattern('updateTransaction')
  update(@Payload() updateTransactionDto: UpdateTransactionDto) {
    return this.transactionsService.update(updateTransactionDto.id, updateTransactionDto);
  }

  @MessagePattern('removeTransaction')
  remove(@Payload() id: number) {
    return this.transactionsService.remove(id);
  }
}
