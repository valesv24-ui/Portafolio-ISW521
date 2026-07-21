import { Server as SocketIOServer } from 'socket.io';
import { RealtimeNotifier } from '../../../../application/ports/outbound/RealtimeNotifier';

/**
 * Adaptador de salida: publica eventos a los clientes conectados por WebSocket.
 * Implementa el puerto RealtimeNotifier; la capa de aplicación no sabe que
 * "detrás" hay Socket.io (podría ser SSE, Pusher, etc. sin cambiar casos de uso).
 */
export class SocketIoRealtimeNotifier implements RealtimeNotifier {
  constructor(private readonly io: SocketIOServer) {}

  notifyNewMessage(conversationId: string, payload: unknown): void {
    this.io.emit('message:new', { conversationId, message: payload });
  }
}
