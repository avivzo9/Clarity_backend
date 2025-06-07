"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var TransactionsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionsService = void 0;
const common_1 = require("@nestjs/common");
let TransactionsService = TransactionsService_1 = class TransactionsService {
    constructor() {
        this.logger = new common_1.Logger(TransactionsService_1.name);
    }
    async handleTransactionCreated(data) {
        try {
            this.logger.log(`Processing transaction creation: ${JSON.stringify(data)}`);
            return { success: true, data };
        }
        catch (error) {
            this.logger.error(`Error processing transaction creation: ${error.message}`, error.stack);
            throw error;
        }
    }
    async handleTransactionUpdated(data) {
        try {
            this.logger.log(`Processing transaction update: ${JSON.stringify(data)}`);
            return { success: true, data };
        }
        catch (error) {
            this.logger.error(`Error processing transaction update: ${error.message}`, error.stack);
            throw error;
        }
    }
    async handleTransactionDeleted(data) {
        try {
            this.logger.log(`Processing transaction deletion: ${JSON.stringify(data)}`);
            return { success: true, data };
        }
        catch (error) {
            this.logger.error(`Error processing transaction deletion: ${error.message}`, error.stack);
            throw error;
        }
    }
};
exports.TransactionsService = TransactionsService;
exports.TransactionsService = TransactionsService = TransactionsService_1 = __decorate([
    (0, common_1.Injectable)()
], TransactionsService);
//# sourceMappingURL=transactions.service.js.map