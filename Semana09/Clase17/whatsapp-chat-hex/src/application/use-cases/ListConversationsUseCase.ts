import { ListConversationsInputPort } from '../ports/inbound/ListConversationsInputPort';
import { ConversationSummaryDTO } from '../dto/ConversationSummaryDTO';
import { ConversationRepository } from '../../domain/repositories/ConversationRepository';

export class ListConversationsUseCase implements ListConversationsInputPort {
  constructor(private readonly conversationRepository: ConversationRepository) {}

  async execute(): Promise<ConversationSummaryDTO[]> {
    const conversations = await this.conversationRepository.findAll();
    return conversations
      .sort((a, b) => b.lastActivityAt.getTime() - a.lastActivityAt.getTime())
      .map((c) => c.toPrimitives());
  }
}
