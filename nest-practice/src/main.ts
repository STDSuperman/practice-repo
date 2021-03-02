import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as CookieParser from 'cookie-parser';
import * as cluster from 'cluster'
import * as os from 'os';
import AbTestAnalyze from './common/utils/ab-test-analyze';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(CookieParser());
  app.use(AbTestAnalyze);
  const swaggerOptions = new DocumentBuilder()
    .setTitle('nest-start api doc')
    .setDescription('API文档')
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

startSingle();
