import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const GRPCOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'Grpc',
    protoPath: join(__dirname, './app.proto'),
  },
};
