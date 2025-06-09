import { NestFactory } from '@nestjs/core';
import { ClarityGatewayModule } from './clarity-gateway.module';

async function bootstrap() {
  const app = await NestFactory.create(ClarityGatewayModule);
  app.enableCors();
  await app.listen(3000, '0.0.0.0');
}

bootstrap();