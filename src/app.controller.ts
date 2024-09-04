import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {
  EventPattern,
  MessagePattern,
  RpcException,
  Transport,
} from '@nestjs/microservices';
import { createUserEvent } from './create-user.event';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @EventPattern('user_created', Transport.TCP)
  handleUserCreated(data: createUserEvent) {
    this.appService.handleUserCreated(data);
  }

  @MessagePattern({ cmd: 'get_analytics' })
  async getAnalytics() {
    try {
      console.log('get-analytics controller says hello');
      return await this.appService.getAnalytics();
    } catch (error) {
      console.error('Error in getAnalytics:', error);
      throw new RpcException('Failed to get analytics data');
    }
  }

  @Get('notify-subscriber')
  async NotifyAnalytics() {
    try {
      return await this.appService.NotifyAnalytics();
    } catch (oError) {
      console.log(oError);
    }
  }
}
