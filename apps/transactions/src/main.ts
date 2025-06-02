import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { TransactionsModule } from './transactions-app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    TransactionsModule,
    {
      transport: Transport.TCP,
      options: {
        host: '0.0.0.0',
        port: 3002,
      },
    },
  );
  await app.listen();
  console.log('Users microservice listening on 0.0.0.0:3001');
}

bootstrap();