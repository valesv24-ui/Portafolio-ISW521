import { Server as SocketIOServer } from 'socket.io';

import { InMemoryConversationRepository } from '../adapters/outbound/persistence/InMemoryConversationRepository';
import { SocketIoRealtimeNotifier } from '../adapters/outbound/realtime/SocketIoRealtimeNotifier';
import { BaileysGateway } from '../adapters/outbound/whatsapp/BaileysGateway';

import { SendMessageUseCase } from '../../application/use-cases/SendMessageUseCase';
import { ReceiveIncomingMessageUseCase } from '../../application/use-cases/ReceiveIncomingMessageUseCase';
import { ListConversationsUseCase } from '../../application/use-cases/ListConversationsUseCase';
import { GetConversationHistoryUseCase } from '../../application/use-cases/GetConversationHistoryUseCase';

import { env } from './env';

/**
 * Composition root: único lugar del proyecto que conoce todas las clases
 * concretas y las conecta. Domain y Application jamás importan infraestructura;
 * es infraestructura (aquí) la que depende hacia adentro (Dependency Inversion).
 */
export function buildContainer(io: SocketIOServer) {
  // --- Adaptadores de salida ---
  const conversationRepository = new InMemoryConversationRepository();
  const realtimeNotifier = new SocketIoRealtimeNotifier(io);
  const whatsAppGateway = new BaileysGateway(env.whatsappSessionName);

  // --- Casos de uso (puertos de entrada) ---
  const receiveIncomingMessageUseCase = new ReceiveIncomingMessageUseCase(
    conversationRepository,
    realtimeNotifier,
  );

  const sendMessageUseCase = new SendMessageUseCase(
    conversationRepository,
    whatsAppGateway,
    realtimeNotifier,
  );

  const listConversationsUseCase = new ListConversationsUseCase(conversationRepository);
  const getConversationHistoryUseCase = new GetConversationHistoryUseCase(conversationRepository);

  // Conecta el evento "mensaje entrante" del gateway con su caso de uso
  whatsAppGateway.onIncomingMessage((from, text) => {
    receiveIncomingMessageUseCase.execute({ from, text }).catch((error) => {
      // eslint-disable-next-line no-console
      console.error('Error procesando mensaje entrante:', error);
    });
  });

  return {
    whatsAppGateway,
    sendMessageUseCase,
    receiveIncomingMessageUseCase,
    listConversationsUseCase,
    getConversationHistoryUseCase,
  };
}
