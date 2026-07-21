import express from 'express';
import path from 'path';
import { createServer } from 'http';

import { env } from './infrastructure/config/env';
import { buildContainer } from './infrastructure/config/container';
import { createSocketServer } from './infrastructure/adapters/inbound/websocket/SocketServerFactory';
import { createChatRouter } from './infrastructure/adapters/inbound/http/ChatController';
import { errorHandler } from './infrastructure/adapters/inbound/http/errorHandler';

async function bootstrap(): Promise<void> {
  const app = express();
  app.use(express.json());
  app.use(express.static(path.join(__dirname, '..', 'public')));

  const httpServer = createServer(app);
  const io = createSocketServer(httpServer);

  const {
    whatsAppGateway,
    sendMessageUseCase,
    listConversationsUseCase,
    getConversationHistoryUseCase,
  } = buildContainer(io);

  app.use('/api', createChatRouter({
    sendMessageUseCase,
    listConversationsUseCase,
    getConversationHistoryUseCase,
  }));

  app.use(errorHandler);

  httpServer.listen(env.port, () => {
    // eslint-disable-next-line no-console
    console.log(`🚀 Servidor escuchando en http://localhost:${env.port}`);
  });

  // Inicia el cliente de WhatsApp (mostrará QR en consola la primera vez).
  // Se maneja en su propio try/catch: si el gateway de WhatsApp falla al
  // conectar (red, credenciales, WhatsApp caído, etc.), el servidor HTTP
  // y los WebSockets deben seguir funcionando; sólo el envío/recepción
  // real de WhatsApp quedará inactivo hasta reintentar.
  try {
    await whatsAppGateway.initialize();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('⚠️  No se pudo inicializar el cliente de WhatsApp (el servidor sigue activo):', error);
  }
}

bootstrap().catch((error) => {
  // Sólo llegamos aquí si falla algo antes de levantar el servidor
  // eslint-disable-next-line no-console
  console.error('Error fatal al iniciar la aplicación:', error);
  process.exit(1);
});
