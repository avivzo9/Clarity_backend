"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const microservices_1 = require("@nestjs/microservices");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const logger = new common_1.Logger('TransactionsService');
    const app = await core_1.NestFactory.createMicroservice(app_module_1.AppModule, {
        transport: microservices_1.Transport.KAFKA,
        options: {
            client: {
                brokers: ['localhost:9092'],
            },
            consumer: {
                groupId: 'transactions-consumer',
            },
        },
    });
    await app.listen();
    logger.log('Transactions microservice is listening');
}
bootstrap();
//# sourceMappingURL=main.js.map