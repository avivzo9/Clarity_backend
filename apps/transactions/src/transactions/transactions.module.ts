import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from '@app/contracts/transactions/transaction.entity';
import { User } from '@app/contracts/users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [Transaction, User],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Transaction]),
    ClientsModule.register([
      {
        name: 'TRANSACTIONS_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'transactions',
            brokers: ['kafka:29092'],
          },
          consumer: {
            groupId: 'transactions-consumer',
          },
        },
      },
    ]),
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionsModule { }
