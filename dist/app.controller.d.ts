import { AppService } from './app.service';
import { createUserEvent } from './create-user.event';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
    handleUserCreated(data: createUserEvent): void;
    getAnalytics(): Promise<any[]>;
    NotifyAnalytics(): Promise<import("rxjs").Observable<any>>;
}
