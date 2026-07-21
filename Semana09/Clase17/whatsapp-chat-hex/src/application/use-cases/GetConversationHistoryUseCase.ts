import { GetConversationHistoryInputPort } from '../ports/inbound/GetConversationHistoryInputPort';
import { MessageDTO } from '../dto/MessageDTO';
import { ConversationRepository } from '../../domain/repositories/ConversationRepository';
import { ConversationId } from '../../domain/value-objects/ConversationId';

export class GetConversationHistoryUseCase implements GetConversationHistoryInputPort {
  constructor(private readonly conversationRepository: ConversationRepository) {}

  async execute(conversationId: string): Promise<MessageDTO[]> {
    const conversation = await this.conversationRepository.findById(ConversationId.fromString(conversationId));
    if (!conversation) {
      throw new Error(`Conversación no encontrada: ${conversationId}`);
    }
    return conversation.messages.map((m) => m.toPrimitives());
  }
}
