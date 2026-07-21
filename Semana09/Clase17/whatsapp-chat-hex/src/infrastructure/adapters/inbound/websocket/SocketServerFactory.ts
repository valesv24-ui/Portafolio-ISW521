import { Server as HttpServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';

/**
 * Adaptador de entrada: crea el servidor de WebSockets sobre el servidor HTTP.
 * Aquí sólo se configura transporte; la lógica de negocio vive en los casos de uso.
 */
export function createSocketServer(httpServer: HttpServer): SocketIOServer {
  const io = new SocketIOServer(httpServer, {
    cors: { origin: '*' },
  });

  io.on('connection', (socket) => {
    // eslint-disable-next-line no-console
    console.log(`Cliente conectado por WebSocket: ${socket.id}`);
    socket.on('disconnect', () => {
      // eslint-disable-next-line no-console
      console.log(`Cliente desconectado: ${socket.id}`);
    });
  });

  return io;
}
