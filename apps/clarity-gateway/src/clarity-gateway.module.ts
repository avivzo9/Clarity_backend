import { Module } from '@nestjs/common';
import { ClarityGatewayController } from './clarity-gateway.controller';
import { ClarityGatewayService } from './clarity-gateway.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [ClarityGatewayController],
  providers: [ClarityGatewayService],
})
export class ClarityGatewayModule {}
