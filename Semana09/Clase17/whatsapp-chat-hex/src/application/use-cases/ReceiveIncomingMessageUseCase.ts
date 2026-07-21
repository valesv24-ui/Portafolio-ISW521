import { ReceiveIncomingMessageInputPort } from '../ports/inbound/ReceiveIncomingMessageInputPort';
import { IncomingMessageDTO } from '../dto/IncomingMessageDTO';
import { MessageDTO } from '../dto/MessageDTO';
import { ConversationRepository } from '../../domain/repositories/ConversationRepository';
import { RealtimeNotifier } from '../ports/outbound/RealtimeNotifier';
import { Conversation } from '../../domain/entities/Conversation';
import { PhoneNumber } from '../../domain/value-objects/PhoneNumber';
import { MessageContent } from '../../domain/value-objects/MessageContent';

/**
 * Caso de uso: procesar un mensaje entrante emitido por el adaptador de WhatsApp.
 * Se dispara desde el evento 'message' del gateway (adaptador inbound "dirigido"
 * por infraestructura, pero orquestado aquí).
 */
export class ReceiveIncomingMessageUseCase implements ReceiveIncomingMessageInputPort {
  constructor(
    private readonly conversationRepository: ConversationRepository,
    private readonly realtimeNotifier: RealtimeNotifier,
  ) {}

  async execute(dto: IncomingMessageDTO): Promise<MessageDTO> {
    const contact = new PhoneNumber(dto.from);
    const content = new MessageContent(dto.text);

    let conversation = await this.conversationRepository.findByContact(contact);
    if (!conversation) {
      conversation = Conversation.startNew(contact);
    }

    const message = conversation.receiveMessage(content);
    await this.conversationRepository.save(conversation);

    const payload = message.toPrimitives();
    this.realtimeNotifier.notifyNewMessage(conversation.id.toString(), payload);
    conversation.pullDomainEvents();

    return payload;
  }
}
