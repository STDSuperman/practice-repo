import { Observable } from 'rxjs';

export interface GrpcService {
  grpcFindOne(data: HeroById): Observable<Hero>;
  grpcFindMany(stream: Observable<HeroById>): Observable<Hero>;
}

export interface HeroById {
  id: number;
}

export interface Hero {
  id: number;
  name: string;
}
