import { WebSocketGateway, WebSocketServer, OnGatewayInit } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class EventsGateway implements OnGatewayInit {
  @WebSocketServer() server: Server;

  afterInit() {
    console.log('WebSocket server initialized');
  }

  notifyDeposit(data: any) {
    this.server.emit('deposit', data);
  }
}
