import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  OnModuleInit,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import {
  EventPattern,
  MessagePattern,
  RpcException,
  Transport,
  ClientKafka,
} from '@nestjs/microservices';
import { createUserEvent } from './create-user.event';
import { AuthGuard } from './guards/auth.guard';
import { AuthFlag } from './decorators/auth-flag.decorator';
@Controller()
export class AppController implements OnModuleInit {
  constructor(
    private readonly appService: AppService,
    @Inject('AUTH_SERVICE') private readonly authClient: ClientKafka,
  ) {}

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
  @UseGuards(AuthGuard)
  @AuthFlag('privateRoute')
  async NotifyAnalytics() {
    try {
      return await this.appService.NotifyAnalytics();
    } catch (oError) {
      throw new HttpException(oError, HttpStatus.UNAUTHORIZED);
    }
  }

  onModuleInit() {
    this.authClient.subscribeToResponseOf('authorize_user');
  }
}
