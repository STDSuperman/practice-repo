import { Controller, Inject } from '@nestjs/common';
import { MessagePattern, Payload, ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Controller()
export class AppController {
  constructor(@Inject('REDIS_SERVER') private readonly client: ClientProxy) {}

  @MessagePattern({ cmd: 'getSum' })
  pub(@Payload() data: number[]): Observable<number> {
    console.log('getSum');
    return this.client.send<number>({ cmd: 'clientSum' }, data);
  }
}
