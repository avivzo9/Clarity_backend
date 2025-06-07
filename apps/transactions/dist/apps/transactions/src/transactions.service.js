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
exports.TransactionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const transaction_entity_1 = require("./transaction.entity");
let TransactionsService = class TransactionsService {
    constructor(repo) {
        this.repo = repo;
    }
    create(transactionDto, user) {
        const transaction = this.repo.create(transactionDto);
        transaction.user = user;
        return this.repo.save(transaction);
    }
    findAll(user) {
        return this.repo.find({ where: { user: { id: user.id } } });
    }
    async findOne(id, user) {
        if (!id) {
            return null;
        }
        return this.repo.findOne({ where: { id: parseInt(id), user: { id: user.id } } });
    }
    async update(id, attrs, user) {
        const transaction = await this.findOne(id, user);
        if (!transaction) {
            throw new common_1.NotFoundException('transaction not found');
        }
        Object.assign(transaction, attrs);
        return this.repo.save(transaction);
    }
    async remove(id, user) {
        const transaction = await this.findOne(id, user);
        if (!transaction) {
            throw new common_1.NotFoundException('transaction not found');
        }
        return this.repo.remove(transaction);
    }
};
exports.TransactionsService = TransactionsService;
exports.TransactionsService = TransactionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(transaction_entity_1.Transaction)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TransactionsService);
//# sourceMappingURL=transactions.service.js.map