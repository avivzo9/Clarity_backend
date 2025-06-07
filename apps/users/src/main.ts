import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('UsersService');
  const brokers = (process.env.KAFKA_BROKERS || 'kafka:29092').split(',');

  try {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
      AppModule,
      {
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers,
            clientId: 'users-service',
          },
          consumer: {
            groupId: 'users-consumer',
            allowAutoTopicCreation: true,
          },
          producer: {
            allowAutoTopicCreation: true,
          },
          run: {
            autoCommit: true,
          },
        },
      },
    );

    await app.listen();
    logger.log('Users microservice is listening');
  } catch (error) {
    logger.error('Failed to start users microservice:', error);
    process.exit(1);
  }
}

bootstrap();
