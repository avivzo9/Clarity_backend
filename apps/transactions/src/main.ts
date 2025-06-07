import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
    const logger = new Logger('TransactionsService');
    const brokers = (process.env.KAFKA_BROKERS || 'kafka:29092').split(',');
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
        AppModule,
        {
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
    );
    await app.listen();
    logger.log('Transactions microservice is listening');
}
bootstrap(); 