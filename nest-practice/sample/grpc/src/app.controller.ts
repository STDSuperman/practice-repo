import { Controller, Get, OnModuleInit, Inject, Param } from '@nestjs/common';
import { ClientGrpcProxy } from '@nestjs/microservices';
import { GrpcService, Hero, HeroById } from './interface';
import { Observable, ReplaySubject } from 'rxjs';
import { toArray } from 'rxjs/operators';

@Controller()
export class AppController implements OnModuleInit {
  constructor(@Inject('GRPC_CLIENT') private client: ClientGrpcProxy) {}

  private grpcService: GrpcService;

  onModuleInit() {
    this.grpcService = this.client.getService<GrpcService>('GrpcService');
  }

  @Get('/one/:id')
  findOne(@Param('id') id: number): Observable<Hero> {
    return this.grpcService.findOne({ id });
  }

  @Get('/many')
  findMany(): Observable<Hero[]> {
    const subject = new ReplaySubject<HeroById>();
    subject.next({ id: 1 });
    subject.next({ id: 2 });
    subject.complete();

    const stream = this.grpcService.findMany(subject.asObservable());
    return stream.pipe(toArray());
  }
}
