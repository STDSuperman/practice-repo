import { Injectable, NestMiddleware  } from '@nestjs/common';
import { Request, NextFunction } from 'express';

@Injectable()
export class CatsMiddlewareClass implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        console.log(req.url, req.method);
        next();
    }
}