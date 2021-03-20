import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.REDIS,
      options: {
        retryDelay: 5000,
        url: 'redis://localhost:6379',
      },
    },
  );
  await app.listen(() => console.log('Microservice listening'));
}
bootstrap();
