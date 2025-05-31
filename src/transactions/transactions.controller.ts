import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dtos/create-transaction.dto';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';
import { UseSerialize } from 'src/interceptors/serialize.interceptor';
import { TransactionDto } from './dtos/transaction.dto';
import { ApproveTransactionDto } from './dtos/approve-transaction.dto';
import { AdminGuard } from 'src/guards/admin.guard';
import { GetTransactionDto } from './dtos/get-transaction.dto';

@Controller('transaction')
@UseGuards(AuthGuard)
export class TransactionsController {

    constructor(private transactionsSrv: TransactionsService) { }

    @Get()
    getTransactions(@Query() query: GetTransactionDto, @CurrentUser() user: User) {
        return this.transactionsSrv.getTransactions(query, user);
    }

    @Post()
    @UseSerialize(TransactionDto)
    createTransaction(@Body() body: CreateTransactionDto, @CurrentUser() user: User) {
        return this.transactionsSrv.create(body, user);
    }

    @Post('bulk')
    @UseSerialize(TransactionDto)
    createTransactions(@Body() body: CreateTransactionDto[], @CurrentUser() user: User) {
        return this.transactionsSrv.createBulk(body, user);
    }

    @Patch(':id')
    @UseGuards(AdminGuard)
    approveTransaction(@Param('id') id: string, @Body() body: ApproveTransactionDto) {
        return this.transactionsSrv.changeApproval(id, body.approved);
    }

    @Delete(':id')
    removeTransaction(@Param('id') id: string) {
        return this.transactionsSrv.remove(id);
    }

    @Delete()
    removeTransactions(@Body('ids') ids: string[]) {
        return this.transactionsSrv.remove(ids);
    }
}