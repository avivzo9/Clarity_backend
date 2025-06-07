"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionsController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const transactions_service_1 = require("./transactions.service");
const interfaces_1 = require("@clarity/interfaces");
let TransactionsController = class TransactionsController {
    constructor(transactionsService) {
        this.transactionsService = transactionsService;
    }
    async handleTransactionCreated(data) {
        return this.transactionsService.handleTransactionCreated(data);
    }
    async handleTransactionUpdated(data) {
        return this.transactionsService.handleTransactionUpdated(data);
    }
    async handleTransactionDeleted(data) {
        return this.transactionsService.handleTransactionDeleted(data);
    }
};
exports.TransactionsController = TransactionsController;
__decorate([
    (0, microservices_1.MessagePattern)(interfaces_1.KAFKA_TOPICS.TRANSACTION.CREATED),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TransactionsController.prototype, "handleTransactionCreated", null);
__decorate([
    (0, microservices_1.MessagePattern)(interfaces_1.KAFKA_TOPICS.TRANSACTION.UPDATED),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TransactionsController.prototype, "handleTransactionUpdated", null);
__decorate([
    (0, microservices_1.MessagePattern)(interfaces_1.KAFKA_TOPICS.TRANSACTION.DELETED),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TransactionsController.prototype, "handleTransactionDeleted", null);
exports.TransactionsController = TransactionsController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [transactions_service_1.TransactionsService])
], TransactionsController);
//# sourceMappingURL=transactions.controller.js.map