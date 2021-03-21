import { Controller, Get, OnModuleInit, Inject, Param } from '@nestjs/common';
import {
  ClientGrpc,
  GrpcStreamMethod,
  GrpcMethod,
} from '@nestjs/microservices';
import { GrpcService, Hero, HeroById } from './interface';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { toArray } from 'rxjs/operators';

@Controller()
export class AppController implements OnModuleInit {
  constructor(@Inject('GRPC_CLIENT') private client: ClientGrpc) {}

  private grpcService: GrpcService;

  private itemList: Array<Hero> = [
    { id: 1, name: '张三' },
    { id: 2, name: '李四' },
  ];

  onModuleInit() {
    this.grpcService = this.client.getService<GrpcService>('GrpcService');
  }

  @Get('/one/:id')
  findOne(@Param('id') id: number): Observable<Hero> {
    return this.grpcService.grpcFindOne({ id });
  }

  @Get('/many')
  findMany(): Observable<Hero[]> {
    const subject = new ReplaySubject<HeroById>();
    subject.next({ id: 1 });
    subject.next({ id: 2 });
    subject.complete();

    const stream = this.grpcService.grpcFindMany(subject.asObservable());
    return stream.pipe(toArray());
  }

  @GrpcMethod('GrpcService', 'grpcFindOne')
  grpcFindOne(data: HeroById): Hero {
    return this.itemList.find((item: Hero) => item.id === data.id);
  }

  @GrpcStreamMethod('GrpcService', 'grpcFindMany')
  grpcFindMany(data: Observable<HeroById>): Observable<Hero> {
    const subject = new Subject<Hero>();
    const onNext = (idData: HeroById) => {
      const one: Hero = this.itemList.find((item) => item.id === idData.id);
      subject.next(one);
    };

    const onComplete = () => subject.complete();

    data.subscribe({
      next: onNext,
      complete: onComplete,
    });

    return subject.asObservable();
  }
}
