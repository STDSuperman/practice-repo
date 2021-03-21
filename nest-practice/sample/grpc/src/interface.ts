import { Observable } from 'rxjs';

export interface GrpcService {
  findOne(data: HeroById): Observable<Hero>;
  findMany(stream: Observable<HeroById>): Observable<Hero>;
}

export interface HeroById {
  id: number;
}

export interface Hero {
  id: number;
  name: string;
}
