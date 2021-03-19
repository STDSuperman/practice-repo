import { Controller, Get, Inject } from '@nestjs/common'
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import { MATH_SERVICE } from './microservice.constants';

@Controller('microservice')
export default class MicroserviceController{
    constructor(@Inject(MATH_SERVICE) private client: ClientProxy) {}

    @Get('/accumulate')
    accumulate() {
        const pattern = {cmd: 'sum'};
        const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        return this.client.send<number>(pattern, data)
    }

    @MessagePattern({cmd: 'sum'})
    sum(@Payload() data: number[]): number {
        return data.reduce((pre, cur) => pre + cur, 0)
    }
}