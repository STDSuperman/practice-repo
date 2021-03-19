import { Module } from '@nestjs/common'
import MicroserviceController from './microservice.controller';
import { MATH_SERVICE } from './microservice.constants';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
    controllers: [MicroserviceController],
    imports: [ClientsModule.register([{name: MATH_SERVICE, transport: Transport.TCP}])],
})
export default class MicroserviceModule{}