import { Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, Patch, Post, Query, Session, UseGuards } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateTransactionDto } from './dtos/create-transaction.dto';
import { TransactionsService } from './transactions.service';
import { UpdateTransactionDto } from './dtos/update-transaction.dto';
import { UseSerialize } from '@app/interceptors';
import { TransactionDto } from './dtos/transaction.dto';
import { CurrentUser } from '@app/users';
import { User } from '@app/users';
import { AuthGuard } from '@app/guards';

@Controller('transactions')
@UseSerialize(TransactionDto)
@UseGuards(AuthGuard)
export class TransactionsController {
    constructor(private transactionsService: TransactionsService) { }

    @MessagePattern('transactions.create')
    async handleCreate(@Payload() body: any) {
        // You may need to adjust user extraction logic
        return this.transactionsService.create(body, body.user);
    }

    @MessagePattern('transactions.findAll')
    async handleFindAll(@Payload() body: any) {
        return this.transactionsService.findAll(body.user);
    }

    @MessagePattern('transactions.findOne')
    async handleFindOne(@Payload() body: any) {
        return this.transactionsService.findOne(body.id, body.user);
    }

    @MessagePattern('transactions.update')
    async handleUpdate(@Payload() body: any) {
        return this.transactionsService.update(body.id, body, body.user);
    }

    @MessagePattern('transactions.remove')
    async handleRemove(@Payload() body: any) {
        return this.transactionsService.remove(body.id, body.user);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    createTransaction(@Body() body: CreateTransactionDto, @CurrentUser() user: User) {
        return this.transactionsService.create(body, user);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    getTransactions(@CurrentUser() user: User) {
        return this.transactionsService.findAll(user);
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async getTransaction(@Param('id') id: string, @CurrentUser() user: User) {
        const transaction = await this.transactionsService.findOne(id, user);

        if (!transaction) throw new NotFoundException();

        return transaction;
    }

    @Patch(':id')
    @HttpCode(HttpStatus.OK)
    updateTransaction(@Param('id') id: string, @Body() body: UpdateTransactionDto, @CurrentUser() user: User) {
        return this.transactionsService.update(id, body, user);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    removeTransaction(@Param('id') id: string, @CurrentUser() user: User) {
        return this.transactionsService.remove(id, user);
    }
} 