import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { CatsService } from './cats/cats.service';
import { CatsMiddlewareClass } from './cats/cats.middleware';
import AuthModule from './auth/auth.module';
import UserModule from './user/user.module';
import GatewayModule from './gateway-ws/events.module';
import UploadFileModule from './file-upload/file-upload.module';
import MicroserviceModule from './microservice/microservice.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    AuthModule,
    UserModule,
    TypeOrmModule.forRoot(),
    UploadFileModule,
    GatewayModule,
    MicroserviceModule,
  ],
  controllers: [AppController, CatsController],
  providers: [AppService, CatsService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CatsMiddlewareClass).forRoutes('/cats');
  }
}
