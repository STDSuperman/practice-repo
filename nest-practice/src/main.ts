import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as CookieParser from 'cookie-parser';
import * as cluster from 'cluster'
import * as os from 'os';
import AbTestAnalyze from './common/utils/ab-test-analyze';
import { WsAdapter } from '@nestjs/platform-ws';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

process.send = process.send || function (): any {};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(CookieParser()); // cookie处理
  app.use(AbTestAnalyze); // abTest部分
  app.useWebSocketAdapter(new WsAdapter(app)) // websocket部分

  // 文档部分
  const swaggerOptions = new DocumentBuilder()
    .setTitle('nest-start api doc')
    .setDescription('API文档')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('/doc', app, document);
  await app.startAllMicroservicesAsync();

  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

// 微服务
async function startMicroservices() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: 3000,
      retryAttempts: 5,
      retryDelay: 5000
    }
  });
  app.useWebSocketAdapter(new WsAdapter(app)) // websocket部分
  app.listen(() => console.log('Microservice is listening'));
}

// 负载均衡调度
function start() {
  const cpusNum = os.cpus().length;
  let pidMap = {};
  let totalReqNum = 0;
  if (cluster.isMaster) {
    for (let i = 0; i < cpusNum; i++) {
      cluster.fork();
    }
    cluster.on('exit', (worker) => {
      console.log(`进程${worker.process.pid}已退出`)
    })

    cluster.on('message', worker => {
      totalReqNum++;
      if (!pidMap[worker.process.pid]) pidMap[worker.process.pid] = 0;
      pidMap[worker.process.pid]++;
      console.log(JSON.stringify(pidMap));
    })
  } else {
    bootstrap();
    console.log(`工作线程${process.pid}已启动`)
  }
}

function startSingle() {
  bootstrap();
}

// startSingle();
startMicroservices();
