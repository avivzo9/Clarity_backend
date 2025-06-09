import { Module } from '@nestjs/common';
import { ClarityGatewayController } from './clarity-gateway.controller';
import { ClarityGatewayService } from './clarity-gateway.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from '@app/contracts/transactions/transaction.entity';
import { User } from '@app/contracts/users/user.entity';
import { Category } from '@app/contracts/categories/category.entity';
import { UsersModule } from './users/users.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [Transaction, User, Category],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Transaction, User, Category]),
    ClientsModule.register([
      {
        name: 'USERS_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'users',
            brokers: ['kafka:29092']
          },
          consumer: {
            groupId: 'users-consumer'
          }
        }
      }
    ]),
    UsersModule
  ],
  controllers: [ClarityGatewayController],
  providers: [ClarityGatewayService],
})
export class ClarityGatewayModule { }
