import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGaurd } from 'src/guards/auth.guard';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dtos/create-transaction.dto';

@Controller('transaction')
@UseGuards(AuthGaurd)
export class TransactionsController {

    constructor(private transactionsSrv: TransactionsService) { }

    @Post()
    createTransaction(@Body() body: CreateTransactionDto) {
        return this.transactionsSrv.create(body);
    }
}