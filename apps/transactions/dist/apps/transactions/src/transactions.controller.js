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
const create_transaction_dto_1 = require("./dtos/create-transaction.dto");
const transactions_service_1 = require("./transactions.service");
const update_transaction_dto_1 = require("./dtos/update-transaction.dto");
const interceptors_1 = require("@app/interceptors");
const transaction_dto_1 = require("./dtos/transaction.dto");
const users_1 = require("@app/users");
const users_2 = require("@app/users");
const guards_1 = require("@app/guards");
let TransactionsController = class TransactionsController {
    constructor(transactionsService) {
        this.transactionsService = transactionsService;
    }
    async handleCreate(body) {
        return this.transactionsService.create(body, body.user);
    }
    async handleFindAll(body) {
        return this.transactionsService.findAll(body.user);
    }
    async handleFindOne(body) {
        return this.transactionsService.findOne(body.id, body.user);
    }
    async handleUpdate(body) {
        return this.transactionsService.update(body.id, body, body.user);
    }
    async handleRemove(body) {
        return this.transactionsService.remove(body.id, body.user);
    }
    createTransaction(body, user) {
        return this.transactionsService.create(body, user);
    }
    getTransactions(user) {
        return this.transactionsService.findAll(user);
    }
    async getTransaction(id, user) {
        const transaction = await this.transactionsService.findOne(id, user);
        if (!transaction)
            throw new common_1.NotFoundException();
        return transaction;
    }
    updateTransaction(id, body, user) {
        return this.transactionsService.update(id, body, user);
    }
    removeTransaction(id, user) {
        return this.transactionsService.remove(id, user);
    }
};
exports.TransactionsController = TransactionsController;
__decorate([
    (0, microservices_1.MessagePattern)('transactions.create'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TransactionsController.prototype, "handleCreate", null);
__decorate([
    (0, microservices_1.MessagePattern)('transactions.findAll'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TransactionsController.prototype, "handleFindAll", null);
__decorate([
    (0, microservices_1.MessagePattern)('transactions.findOne'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TransactionsController.prototype, "handleFindOne", null);
__decorate([
    (0, microservices_1.MessagePattern)('transactions.update'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TransactionsController.prototype, "handleUpdate", null);
__decorate([
    (0, microservices_1.MessagePattern)('transactions.remove'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TransactionsController.prototype, "handleRemove", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, users_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_transaction_dto_1.CreateTransactionDto, users_2.User]),
    __metadata("design:returntype", void 0)
], TransactionsController.prototype, "createTransaction", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, users_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_2.User]),
    __metadata("design:returntype", void 0)
], TransactionsController.prototype, "getTransactions", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, users_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, users_2.User]),
    __metadata("design:returntype", Promise)
], TransactionsController.prototype, "getTransaction", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, users_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_transaction_dto_1.UpdateTransactionDto, users_2.User]),
    __metadata("design:returntype", void 0)
], TransactionsController.prototype, "updateTransaction", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, users_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, users_2.User]),
    __metadata("design:returntype", void 0)
], TransactionsController.prototype, "removeTransaction", null);
exports.TransactionsController = TransactionsController = __decorate([
    (0, common_1.Controller)('transactions'),
    (0, interceptors_1.UseSerialize)(transaction_dto_1.TransactionDto),
    (0, common_1.UseGuards)(guards_1.AuthGuard),
    __metadata("design:paramtypes", [transactions_service_1.TransactionsService])
], TransactionsController);
//# sourceMappingURL=transactions.controller.js.map