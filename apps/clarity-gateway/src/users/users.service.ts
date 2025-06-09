import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreateUserDto } from '@app/contracts/users/dtos/create-user.dto';

@Injectable()
export class UsersService implements OnModuleInit {
    constructor(@Inject('USERS_SERVICE') private userClient: ClientKafka) { }

    async onModuleInit() {
        const requestPatterns = [
            { cmd: 'signup' },
        ];

        // Subscribe to response topics
        requestPatterns.forEach(pattern => {
            this.userClient.subscribeToResponseOf(pattern);
        });

        // Create topics
        const topics = [
            'signup',
            'signup.reply'
        ];

        try {
            // First connect the client
            await this.userClient.connect();

            // Get the admin client
            const admin = this.userClient.createClient().admin();

            // Wait for the admin client to be ready
            await new Promise(resolve => setTimeout(resolve, 5000));

            // Create topics with proper configuration
            await admin.createTopics({
                topics: topics.map(topic => ({
                    topic,
                    numPartitions: 1,
                    replicationFactor: 1,
                    configEntries: [
                        {
                            name: 'min.insync.replicas',
                            value: '1'
                        }
                    ]
                })),
                timeout: 30000 // 30 seconds timeout
            });

            // Wait for topics to be created and leaders to be elected
            await new Promise(resolve => setTimeout(resolve, 5000));

        } catch (error) {
            console.error('Error creating topics:', error);
            // Don't throw the error, just log it and continue
            // The topics might already exist
        }
    }

    async create(createUserDto: CreateUserDto) {
        return this.userClient.send({ cmd: 'signup' }, createUserDto);
    }
}