import { SendMessageInputPort } from '../ports/inbound/SendMessageInputPort';
import { SendMessageDTO } from '../dto/SendMessageDTO';
import { MessageDTO } from '../dto/MessageDTO';
import { ConversationRepository } from '../../domain/repositories/ConversationRepository';
import { WhatsAppGateway } from '../ports/outbound/WhatsAppGateway';
import { RealtimeNotifier } from '../ports/outbound/RealtimeNotifier';
import { Conversation } from '../../domain/entities/Conversation';
import { PhoneNumber } from '../../domain/value-objects/PhoneNumber';
import { MessageContent } from '../../domain/value-objects/MessageContent';
import { MessageStatus } from '../../domain/value-objects/MessageStatus';

/**
 * Caso de uso: enviar un mensaje saliente.
 * Orquesta dominio + puertos de salida, sin conocer detalles de implementación
 * (Single Responsibility: sólo coordina; las reglas de negocio viven en Conversation).
 */
export class SendMessageUseCase implements SendMessageInputPort {
  constructor(
    private readonly conversationRepository: ConversationRepository,
    private readonly whatsAppGateway: WhatsAppGateway,
    private readonly realtimeNotifier: RealtimeNotifier,
  ) {}

  async execute(dto: SendMessageDTO): Promise<MessageDTO> {
    const contact = new PhoneNumber(dto.to);
    const content = new MessageContent(dto.text);

    let conversation = await this.conversationRepository.findByContact(contact);
    if (!conversation) {
      conversation = Conversation.startNew(contact);
    }

    const message = conversation.sendMessage(content);

    try {
      await this.whatsAppGateway.sendMessage(contact, content);
      message.markAs(MessageStatus.SENT);
    } catch (error) {
      message.markAs(MessageStatus.FAILED);
      await this.conversationRepository.save(conversation);
      throw error;
    }

    await this.conversationRepository.save(conversation);

    const payload = message.toPrimitives();
    this.realtimeNotifier.notifyNewMessage(conversation.id.toString(), payload);
    conversation.pullDomainEvents();

    return payload;
  }
}
