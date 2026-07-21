import { PhoneNumber } from '../../../domain/value-objects/PhoneNumber';
import { MessageContent } from '../../../domain/value-objects/MessageContent';

/**
 * Puerto de salida: abstrae el proveedor real de WhatsApp.
 * La aplicación sólo conoce esta interfaz (Interface Segregation + Dependency Inversion);
 * el adaptador concreto (whatsapp-web.js, Cloud API, mock...) vive en infraestructura.
 */
export interface WhatsAppGateway {
  sendMessage(to: PhoneNumber, content: MessageContent): Promise<void>;
  isReady(): boolean;
}
