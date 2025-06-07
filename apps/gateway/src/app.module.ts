import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';

const brokers = (process.env.KAFKA_BROKERS || 'kafka:29092').split(',');

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USERS_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers,
          },
          consumer: {
            groupId: 'users-consumer',
          },
        },
      },
      {
        name: 'TRANSACTIONS_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers,
          },
          consumer: {
            groupId: 'transactions-consumer',
          },
        },
      },
      {
        name: 'CATEGORIES_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers,
          },
          consumer: {
            groupId: 'categories-consumer',
          },
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
