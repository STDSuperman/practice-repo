import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { GRPCOptions } from './client.grpc';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>(GRPCOptions);

  await app.startAllMicroservicesAsync();
  await app.listen(3000);
}
bootstrap();
