import { Inject, Injectable } from '@nestjs/common';
import { createUserEvent } from './create-user.event';
import { ClientProxy } from '@nestjs/microservices';
import { NotifyAnalyticsData } from './notify-analytics-dto';
@Injectable()
export class AppService {
  private readonly analytics: any[] = [];
  private readonly notifyData: any = NotifyAnalyticsData;

  constructor(
    @Inject('COMMUNICATION') private readonly communicationClient: ClientProxy,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async handleUserCreated(data: createUserEvent) {
    console.log('handleUserCreated - ANALYTICS', data);
    this.analytics.push({
      email: data.email,
      timestamps: new Date(),
    });
    this.notifyData.subscriberLimit = this.analytics.length;
    //TODO: Email the user...
  }

  getAnalytics() {
    try {
      console.log('get-analytics says hello', this.analytics);
      return this.analytics;
    } catch (oError) {
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
      return await this.communicationClient.send(
        { cmd: 'send_notification' },
        payload,
      );
    } catch (oError) {}
  }
}
