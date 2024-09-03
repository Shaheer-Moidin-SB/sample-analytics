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
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const notify_analytics_dto_1 = require("./notify-analytics-dto");
let AppService = class AppService {
    constructor(communicationClient) {
        this.communicationClient = communicationClient;
        this.analytics = [];
        this.notifyData = notify_analytics_dto_1.NotifyAnalyticsData;
    }
    getHello() {
        return 'Hello World!';
    }
    async handleUserCreated(data) {
        console.log('handleUserCreated - ANALYTICS', data);
        this.analytics.push({
            email: data.email,
            timestamps: new Date(),
        });
        this.notifyData.subscriberLimit = this.analytics.length;
    }
    getAnalytics() {
        try {
            console.log('get-analytics says hello', this.analytics);
            return this.analytics;
        }
        catch (oError) {
            throw oError;
        }
    }
    async NotifyAnalytics() {
        try {
            const payload = {
                subscriberCount: this.notifyData.subscriberLimit
                    ? this.notifyData.subscriberLimit
                    : 0,
                shouldNotify: true,
            };
            return await this.communicationClient.send({ cmd: 'send_notification' }, payload);
        }
        catch (oError) { }
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('COMMUNICATION')),
    __metadata("design:paramtypes", [microservices_1.ClientProxy])
], AppService);
//# sourceMappingURL=app.service.js.map