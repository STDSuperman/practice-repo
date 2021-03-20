import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'clientSum' })
  sum(data: number[]): number {
    console.log('这里是微服务：', data);
    return (data || []).reduce((a, b) => a + b);
  }
}
