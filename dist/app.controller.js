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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const microservices_1 = require("@nestjs/microservices");
const create_user_event_1 = require("./create-user.event");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    getHello() {
        return this.appService.getHello();
    }
    handleUserCreated(data) {
        this.appService.handleUserCreated(data);
    }
    async getAnalytics() {
        try {
            console.log('get-analytics controller says hello');
            return await this.appService.getAnalytics();
        }
        catch (error) {
            console.error('Error in getAnalytics:', error);
            throw new microservices_1.RpcException('Failed to get analytics data');
        }
    }
    async NotifyAnalytics() {
        try {
            return await this.appService.NotifyAnalytics();
        }
        catch (oError) {
            console.log(oError);
        }
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
__decorate([
    (0, microservices_1.EventPattern)('user_created', microservices_1.Transport.TCP),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_event_1.createUserEvent]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "handleUserCreated", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'get_analytics' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getAnalytics", null);
__decorate([
    (0, common_1.Get)('notify-subscriber'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "NotifyAnalytics", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
//# sourceMappingURL=app.controller.js.map