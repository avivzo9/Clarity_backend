import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
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
          groupId: 'categories-consumer',
        },
      },
    },
  );
  await app.listen();
}
bootstrap();
