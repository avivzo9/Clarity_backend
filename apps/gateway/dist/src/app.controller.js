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
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const app_service_1 = require("./app.service");
let AppController = class AppController {
    constructor(appService, usersClient, transactionsClient, categoriesClient) {
        this.appService = appService;
        this.usersClient = usersClient;
        this.transactionsClient = transactionsClient;
        this.categoriesClient = categoriesClient;
    }
    signup(body) {
        return this.usersClient.send('auth.signup', body);
    }
    signin(body) {
        return this.usersClient.send('auth.signin', body);
    }
    currentUser() {
        return this.usersClient.send('auth.currentuser', {});
    }
    signout() {
        return this.usersClient.send('auth.signout', {});
    }
    createTransaction(body) {
        return this.transactionsClient.send('transactions.create', body);
    }
    getTransactions() {
        return this.transactionsClient.send('transactions.findAll', {});
    }
    getTransaction(id) {
        return this.transactionsClient.send('transactions.findOne', { id });
    }
    updateTransaction(id, body) {
        return this.transactionsClient.send('transactions.update', { id, ...body });
    }
    removeTransaction(id) {
        return this.transactionsClient.send('transactions.remove', { id });
    }
    createCategory(body) {
        return this.categoriesClient.send('categories.create', body);
    }
    getCategories() {
        return this.categoriesClient.send('categories.findAll', {});
    }
    getCategory(id) {
        return this.categoriesClient.send('categories.findOne', { id });
    }
    updateCategory(id, body) {
        return this.categoriesClient.send('categories.update', { id, ...body });
    }
    removeCategory(id) {
        return this.categoriesClient.send('categories.remove', { id });
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Post)('auth/signup'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "signup", null);
__decorate([
    (0, common_1.Post)('auth/signin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "signin", null);
__decorate([
    (0, common_1.Get)('auth/currentuser'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "currentUser", null);
__decorate([
    (0, common_1.Post)('auth/signout'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "signout", null);
__decorate([
    (0, common_1.Post)('transactions'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "createTransaction", null);
__decorate([
    (0, common_1.Get)('transactions'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getTransactions", null);
__decorate([
    (0, common_1.Get)('transactions/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getTransaction", null);
__decorate([
    (0, common_1.Patch)('transactions/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "updateTransaction", null);
__decorate([
    (0, common_1.Delete)('transactions/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "removeTransaction", null);
__decorate([
    (0, common_1.Post)('categories'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "createCategory", null);
__decorate([
    (0, common_1.Get)('categories'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getCategories", null);
__decorate([
    (0, common_1.Get)('categories/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getCategory", null);
__decorate([
    (0, common_1.Patch)('categories/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "updateCategory", null);
__decorate([
    (0, common_1.Delete)('categories/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "removeCategory", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __param(1, (0, common_1.Inject)('USERS_SERVICE')),
    __param(2, (0, common_1.Inject)('TRANSACTIONS_SERVICE')),
    __param(3, (0, common_1.Inject)('CATEGORIES_SERVICE')),
    __metadata("design:paramtypes", [app_service_1.AppService,
        microservices_1.ClientKafka,
        microservices_1.ClientKafka,
        microservices_1.ClientKafka])
], AppController);
//# sourceMappingURL=app.controller.js.map