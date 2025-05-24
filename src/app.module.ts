import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TransactionsModule } from './transactions/transactions.module';
import { Transaction } from './transactions/transaction.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'sqlite',
        database: config.get<string>('DB_NAME'),
        entities: [User, Transaction],
        synchronize: true
      })
    }),
    UsersModule,
    TransactionsModule
  ],
  controllers: [AppController],
  providers: [AppService]
})

export class AppModule { }