import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '@app/contracts/categories/category.entity';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: 'db.sqlite',
            entities: [Category],
            synchronize: true,
        }),
        TypeOrmModule.forFeature([Category]),
        ClientsModule.register([
            {
                name: 'CATEGORIES_SERVICE',
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
        ]),
    ],
    controllers: [CategoriesController],
    providers: [CategoriesService],
})
export class CategoriesModule { } 