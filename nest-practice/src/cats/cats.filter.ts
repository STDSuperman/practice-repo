import {
  Catch,
  HttpException,
  ExceptionFilter,
  ArgumentsHost,
} from '@nestjs/common';

@Catch(HttpException)
export class CatFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest();
    const res = ctx.getResponse();
    const status = exception.getStatus();

    res.status(status).json({
      statusCode: status,
      path: req.url,
      method: req.method,
      timestamp: new Date().getTime(),
    });
  }
}
