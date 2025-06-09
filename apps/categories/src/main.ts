import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { CategoriesModule } from './categories/categories.module';

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
        CategoriesModule,
        {
            transport: Transport.KAFKA,
            options: {
                client: {
                    clientId: 'categories',
                    brokers: ['kafka:29092'],
                },
                consumer: {
                    groupId: 'categories-consumer',
                },
            },
        },
    );
    await app.listen();
}
bootstrap(); 