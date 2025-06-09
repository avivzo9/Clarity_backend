import { Injectable, OnModuleInit, Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Category } from '@app/contracts/categories/category.entity';
import { CreateCategoryDto } from '@app/contracts/categories/dtos/create-category.dto';
import { UpdateCategoryDto } from '@app/contracts/categories/dtos/update-category.dto';

@Injectable()
export class CategoriesService implements OnModuleInit {
    constructor(
        @Inject('CATEGORIES_SERVICE') private readonly categoriesClient: ClientKafka,
    ) { }

    async onModuleInit() {
        const requestPatterns = [
            { cmd: 'create_category' },
            { cmd: 'get_category' },
            { cmd: 'get_all_categories' },
            { cmd: 'update_category' },
            { cmd: 'delete_category' },
        ];

        requestPatterns.forEach(pattern => {
            this.categoriesClient.subscribeToResponseOf(pattern);
        });

        try {
            await this.categoriesClient.connect();

            // Create topics
            const admin = this.categoriesClient.createClient().admin();
            const topics = [
                'create_category',
                'create_category.reply',
                'get_category',
                'get_category.reply',
                'get_all_categories',
                'get_all_categories.reply',
                'update_category',
                'update_category.reply',
                'delete_category',
                'delete_category.reply'
            ];

            await admin.createTopics({
                topics: topics.map(topic => ({
                    topic,
                    numPartitions: 1,
                    replicationFactor: 1,
                })),
            });
        } catch (error) {
            console.error('Failed to connect to Kafka:', error);
        }
    }

    async findOne(id: number): Promise<Category> {
        return this.categoriesClient.send({ cmd: 'get_category' }, { id }).toPromise();
    }

    async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
        return this.categoriesClient.send({ cmd: 'create_category' }, createCategoryDto).toPromise();
    }

    async update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
        return this.categoriesClient.send({ cmd: 'update_category' }, { id, ...updateCategoryDto }).toPromise();
    }

    async remove(id: number): Promise<void> {
        return this.categoriesClient.send({ cmd: 'delete_category' }, { id }).toPromise();
    }

    async findAll(): Promise<Category[]> {
        return this.categoriesClient.send({ cmd: 'get_all_categories' }, {}).toPromise();
    }
} 