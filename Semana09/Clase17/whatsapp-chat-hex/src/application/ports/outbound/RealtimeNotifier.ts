/**
 * Puerto de salida: notifica eventos a clientes conectados en tiempo real
 * (implementado con Socket.io en infraestructura, pero la aplicación no lo sabe).
 */
export interface RealtimeNotifier {
  notifyNewMessage(conversationId: string, payload: unknown): void;
}
