"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const microservices_1 = require("@nestjs/microservices");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const logger = new common_1.Logger('UsersService');
    const brokers = (process.env.KAFKA_BROKERS || 'kafka:29092').split(',');
    try {
        const app = await core_1.NestFactory.createMicroservice(app_module_1.AppModule, {
            transport: microservices_1.Transport.KAFKA,
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
        });
        await app.listen();
        logger.log('Users microservice is listening');
    }
    catch (error) {
        logger.error('Failed to start users microservice:', error);
        process.exit(1);
    }
}
bootstrap();
//# sourceMappingURL=main.js.map