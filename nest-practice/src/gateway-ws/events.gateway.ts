import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  WsResponse,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server } from 'ws';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

@WebSocketGateway(8080)
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('events')
  handleEvents(
    @ConnectedSocket() client: any,
    @MessageBody() data: string,
  ): Observable<WsResponse<number>> {
    console.log(data);
    return from([1, 2, 3]).pipe(map((val) => ({ event: 'events', data: val })));
  }
}
