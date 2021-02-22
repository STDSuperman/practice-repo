import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as CookieParser from 'cookie-parser';
import * as cluster from 'cluster'
import * as os from 'os';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(CookieParser());
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

// 负载均衡调度
function start() {
  const cpusNum = os.cpus().length;
  if (cluster.isMaster) {
    for (let i = 0; i < cpusNum; i++) {
      cluster.fork();
    }
    cluster.on('exit', (worker) => {
      console.log(`进程${worker.process.pid}已退出`)
    })
  } else {
    bootstrap();
    console.log(`工作线程${process.pid}已启动`)
  }
}

start();
