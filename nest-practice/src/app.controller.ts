import { Controller, Get, Redirect, Param, Query, Header } from '@nestjs/common';
import { AppService } from './app.service';
import { Observable, of } from 'rxjs';

@Controller('/tt')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/get-rx-data/:id')
  getRxData(@Param() params): Observable<string> {
    return of(JSON.stringify(params));
  }

  @Get('/redirect')
  @Redirect('/get-rx-data/877')
  redirectToRxData() {
    return {
      url: '/',
      statusCode: 301
    }
  }

  @Get('/query')
  @Header('Cache-Control', 'no-store')
  getQuery(@Query() query): Observable<any[]> {
    return of(query);
  }
}
