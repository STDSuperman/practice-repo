import { Module } from '@nestjs/common';
import MicroserviceController from './microservice.controller';
import { MATH_SERVICE } from './microservice.constants';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  controllers: [MicroserviceController],
  imports: [
    ClientsModule.register([
      {
        name: MATH_SERVICE,
        transport: Transport.REDIS,
        options: {
          url: 'redis://localhost:6379',
        },
      },
    ]),
  ],
})
export default class MicroserviceModule {}
