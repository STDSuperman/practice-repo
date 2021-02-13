import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const swaggerOptions = new DocumentBuilder()
    .setTitle('nest-start api doc')
    .setDescription('这是一个简单的测试demo')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('/doc', app, document)
  await app.listen(3000);
}
bootstrap();
