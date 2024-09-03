import { createUserEvent } from './create-user.event';
import { ClientProxy } from '@nestjs/microservices';
export declare class AppService {
    private readonly communicationClient;
    private readonly analytics;
    private readonly notifyData;
    constructor(communicationClient: ClientProxy);
    getHello(): string;
    handleUserCreated(data: createUserEvent): Promise<void>;
    getAnalytics(): any[];
    NotifyAnalytics(): Promise<import("rxjs").Observable<any>>;
}
