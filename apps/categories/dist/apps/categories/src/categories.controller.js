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
exports.CategoriesController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const create_category_dto_1 = require("./dtos/create-category.dto");
const categories_service_1 = require("./categories.service");
const update_category_dto_1 = require("./dtos/update-category.dto");
const interceptors_1 = require("../../../libs/interceptors/src/index.ts");
const category_dto_1 = require("./dtos/category.dto");
const users_1 = require("../../../libs/users/src/index.ts");
const users_2 = require("../../../libs/users/src/index.ts");
const guards_1 = require("../../../libs/guards/src/index.ts");
let CategoriesController = class CategoriesController {
    constructor(categoriesService) {
        this.categoriesService = categoriesService;
    }
    async handleCreate(body) {
        return this.categoriesService.create(body, body.user);
    }
    async handleFindAll(body) {
        return this.categoriesService.findAll(body.user);
    }
    async handleFindOne(body) {
        return this.categoriesService.findOne(body.id, body.user);
    }
    async handleUpdate(body) {
        return this.categoriesService.update(body.id, body, body.user);
    }
    async handleRemove(body) {
        return this.categoriesService.remove(body.id, body.user);
    }
    createCategory(body, user) {
        return this.categoriesService.create(body, user);
    }
    getCategories(user) {
        return this.categoriesService.findAll(user);
    }
    async getCategory(id, user) {
        const category = await this.categoriesService.findOne(id, user);
        if (!category)
            throw new common_1.NotFoundException();
        return category;
    }
    updateCategory(id, body, user) {
        return this.categoriesService.update(id, body, user);
    }
    removeCategory(id, user) {
        return this.categoriesService.remove(id, user);
    }
};
exports.CategoriesController = CategoriesController;
__decorate([
    (0, microservices_1.MessagePattern)('categories.create'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "handleCreate", null);
__decorate([
    (0, microservices_1.MessagePattern)('categories.findAll'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "handleFindAll", null);
__decorate([
    (0, microservices_1.MessagePattern)('categories.findOne'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "handleFindOne", null);
__decorate([
    (0, microservices_1.MessagePattern)('categories.update'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "handleUpdate", null);
__decorate([
    (0, microservices_1.MessagePattern)('categories.remove'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "handleRemove", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, users_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_category_dto_1.CreateCategoryDto, users_2.User]),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "createCategory", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, users_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_2.User]),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "getCategories", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, users_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, users_2.User]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "getCategory", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, users_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_category_dto_1.UpdateCategoryDto, users_2.User]),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "updateCategory", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, users_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, users_2.User]),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "removeCategory", null);
exports.CategoriesController = CategoriesController = __decorate([
    (0, common_1.Controller)('categories'),
    (0, interceptors_1.UseSerialize)(category_dto_1.CategoryDto),
    (0, common_1.UseGuards)(guards_1.AuthGuard),
    __metadata("design:paramtypes", [categories_service_1.CategoriesService])
], CategoriesController);
//# sourceMappingURL=categories.controller.js.map