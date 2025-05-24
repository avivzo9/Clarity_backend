import { Body, Controller, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGaurd } from 'src/guards/auth.guard';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dtos/create-transaction.dto';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';
import { UseSerialize } from 'src/interceptors/serialize.interceptor';
import { TransactionDto } from './dtos/transaction.dto';
import { ApproveTransactionDto } from './dtos/approve-transaction.dto';
import { AdminGuard } from 'src/guards/admin.guard';

@Controller('transaction')
export class TransactionsController {

    constructor(private transactionsSrv: TransactionsService) { }

    @Post()
    @UseGuards(AuthGaurd)
    @UseSerialize(TransactionDto)
    createTransaction(@Body() body: CreateTransactionDto, @CurrentUser() user: User) {
        return this.transactionsSrv.create(body, user);
    }

    @Patch(':id')
    @UseGuards(AdminGuard)
    appriveTransaction(@Param('id') id: string, @Body() body: ApproveTransactionDto) {
        return this.transactionsSrv.changeApproval(id, body.approved);
    }
}