import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { CatsService } from './cats/cats.service';
import { CatsMiddlewareClass } from './cats/cats.middleware'
import AuthModule from './auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [AppController, CatsController],
  providers: [AppService, CatsService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CatsMiddlewareClass)
      .forRoutes('/cats')
  }
}
