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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const users_1 = require("../../../libs/users/src/index.ts");
const users_2 = require("../../../libs/users/src/index.ts");
const users_3 = require("../../../libs/users/src/index.ts");
const interceptors_1 = require("../../../libs/interceptors/src/index.ts");
const user_dto_1 = require("./dtos/user.dto");
const auth_service_1 = require("./auth.service");
const users_4 = require("../../../libs/users/src/index.ts");
const users_5 = require("../../../libs/users/src/index.ts");
const guards_1 = require("../../../libs/guards/src/index.ts");
const signin_dto_1 = require("./dtos/signin.dto");
const guards_2 = require("../../../libs/guards/src/index.ts");
let UsersController = class UsersController {
    constructor(usersSrv, authSrv, kafkaClient) {
        this.usersSrv = usersSrv;
        this.authSrv = authSrv;
        this.kafkaClient = kafkaClient;
        this.kafkaClient.subscribeToResponseOf('auth.signup.reply');
    }
    async handleSignup(body) {
        return this.authSrv.signup(body.email, body.password);
    }
    async handleSignin(body) {
        return this.authSrv.signin(body.email, body.password);
    }
    async handleCurrentUser(data) {
        return null;
    }
    async handleSignout(data) {
        return true;
    }
    async createUser(body, session) {
        const user = await this.authSrv.signup(body.email, body.password);
        session.userId = user.id;
        return user;
    }
    async signin(body, session) {
        const user = await this.authSrv.signin(body.email, body.password);
        if (!user)
            throw new common_1.NotFoundException();
        session.userId = user.id;
        return user;
    }
    currentUser(user) {
        if (!user)
            throw new common_1.NotFoundException('User not found');
        return user;
    }
    signout(session) {
        if (!session || !session.userId) {
            throw new common_1.NotFoundException('User not signed in');
        }
        session.userId = null;
        return true;
    }
    async findUser(id) {
        const user = await this.usersSrv.findOne(Number(id));
        return user;
    }
    getAllUsers(email) {
        return this.usersSrv.find(email);
    }
    updateUser(id, body) {
        return this.usersSrv.update(Number(id), body);
    }
    removeUser(id) {
        return this.usersSrv.remove(Number(id));
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, microservices_1.MessagePattern)('auth.signup'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "handleSignup", null);
__decorate([
    (0, microservices_1.MessagePattern)('auth.signin'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signin_dto_1.Signin]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "handleSignin", null);
__decorate([
    (0, microservices_1.MessagePattern)('auth.currentuser'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "handleCurrentUser", null);
__decorate([
    (0, microservices_1.MessagePattern)('auth.signout'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "handleSignout", null);
__decorate([
    (0, common_1.Post)('/signup'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_1.CreateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "createUser", null);
__decorate([
    (0, common_1.Post)('/signin'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signin_dto_1.Signin, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "signin", null);
__decorate([
    (0, common_1.Get)('/currentuser'),
    (0, common_1.UseGuards)(guards_1.AuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, users_4.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_5.User]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "currentUser", null);
__decorate([
    (0, common_1.Post)('/signout'),
    (0, common_1.UseGuards)(guards_1.AuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "signout", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, common_1.UseGuards)(guards_2.AdminGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findUser", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(guards_2.AdminGuard),
    __param(0, (0, common_1.Query)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getAllUsers", null);
__decorate([
    (0, common_1.Patch)('/:id'),
    (0, common_1.UseGuards)(guards_2.AdminGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, users_3.UpdateUserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, common_1.UseGuards)(guards_2.AdminGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "removeUser", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('auth'),
    (0, interceptors_1.UseSerialize)(user_dto_1.UserDto),
    __metadata("design:paramtypes", [users_2.UsersService, auth_service_1.AuthService, microservices_1.ClientKafka])
], UsersController);
//# sourceMappingURL=users.controller.js.map