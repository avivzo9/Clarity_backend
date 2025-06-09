import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { TransactionsModule } from './transactions/transactions.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    TransactionsModule,
    {
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
  );
  await app.listen();
  console.log('Users microservice listening on 0.0.0.0:3001');
}

bootstrap();