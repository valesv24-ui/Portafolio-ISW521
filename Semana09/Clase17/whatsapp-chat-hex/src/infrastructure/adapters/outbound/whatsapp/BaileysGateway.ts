import makeWASocket, {
  useMultiFileAuthState,
  DisconnectReason,
  WASocket,
} from '@whiskeysockets/baileys';
import * as qrcode from 'qrcode-terminal';
import { WhatsAppGateway } from '../../../../application/ports/outbound/WhatsAppGateway';
import { PhoneNumber } from '../../../../domain/value-objects/PhoneNumber';
import { MessageContent } from '../../../../domain/value-objects/MessageContent';

export type IncomingMessageHandler = (from: string, text: string) => void;

/**
 * Adaptador de salida (y también origen de eventos entrantes): implementa el
 * puerto WhatsAppGateway usando Baileys (@whiskeysockets/baileys), que habla
 * directamente el protocolo WhatsApp Web multi-dispositivo por WebSocket,
 * sin automatizar un navegador real. Es el ÚNICO punto del sistema que conoce
 * esta librería concreta (Open/Closed + Dependency Inversion): si mañana se
 * cambia por otra implementación, sólo se reemplaza esta clase.
 */
export class BaileysGateway implements WhatsAppGateway {
  private socket: WASocket | null = null;
  private ready = false;
  private incomingHandler: IncomingMessageHandler | null = null;

  constructor(private readonly authFolder = 'auth_info_baileys') {}

  /** Permite a la capa de configuración (composition root) suscribirse a mensajes entrantes */
  onIncomingMessage(handler: IncomingMessageHandler): void {
    this.incomingHandler = handler;
  }

  async initialize(): Promise<void> {
    const { state, saveCreds } = await useMultiFileAuthState(this.authFolder);

    this.socket = makeWASocket({ auth: state });

    this.socket.ev.on('creds.update', saveCreds);

    this.socket.ev.on('connection.update', (update) => {
      const { connection, lastDisconnect, qr } = update;

      if (qr) {
        // eslint-disable-next-line no-console
        console.log('Escanea este código QR con WhatsApp (Dispositivos vinculados):');
        qrcode.generate(qr, { small: true });
      }

      if (connection === 'open') {
        this.ready = true;
        // eslint-disable-next-line no-console
        console.log('✅ Cliente de WhatsApp (Baileys) listo.');
      }

      if (connection === 'close') {
        this.ready = false;
        const statusCode = (lastDisconnect?.error as { output?: { statusCode?: number } } | undefined)
          ?.output?.statusCode;
        const shouldReconnect = statusCode !== DisconnectReason.loggedOut;

        // eslint-disable-next-line no-console
        console.log(
          'Conexión de WhatsApp cerrada.',
          shouldReconnect
            ? 'Reintentando...'
            : `Sesión cerrada. Borra la carpeta "${this.authFolder}" y vuelve a escanear el QR.`,
        );

        if (shouldReconnect) {
          this.initialize().catch((error) => {
            // eslint-disable-next-line no-console
            console.error('Error al reconectar WhatsApp:', error);
          });
        }
      }
    });

    this.socket.ev.on('messages.upsert', ({ messages, type }) => {
      if (type !== 'notify') return;

      for (const msg of messages) {
        if (msg.key.fromMe || !msg.message) continue;

        const from = msg.key.remoteJid;
        // Ignora mensajes de grupos (jid termina en @g.us); sólo chats 1:1 por ahora
        if (!from || from.endsWith('@g.us')) continue;

        const text = msg.message.conversation ?? msg.message.extendedTextMessage?.text;
        if (text && this.incomingHandler) {
          this.incomingHandler(from, text);
        }
      }
    });
  }

  isReady(): boolean {
    return this.ready;
  }

  async sendMessage(to: PhoneNumber, content: MessageContent): Promise<void> {
    if (!this.socket || !this.ready) {
      throw new Error('El cliente de WhatsApp aún no está listo (escanea el QR primero)');
    }
    const jid = `${to.digits}@s.whatsapp.net`;
    await this.socket.sendMessage(jid, { text: content.text });
  }
}
