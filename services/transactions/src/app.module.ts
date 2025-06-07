import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from './config/database.config';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [databaseConfig],
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get('database.host'),
                port: configService.get('database.port'),
                username: configService.get('database.username'),
                password: configService.get('database.password'),
                database: configService.get('database.database'),
                entities: [__dirname + '/**/*.entity{.ts,.js}'],
                synchronize: true, // Set to false in production
                retryAttempts: 10,
                retryDelay: 3000, // 3 seconds
                keepConnectionAlive: true,
            }),
            inject: [ConfigService],
        }),
    ],
    controllers: [],
    providers: [],
})
export class AppModule { } 