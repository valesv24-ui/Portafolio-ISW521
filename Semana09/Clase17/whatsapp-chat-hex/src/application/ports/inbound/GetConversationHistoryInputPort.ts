import { MessageDTO } from '../../dto/MessageDTO';

export interface GetConversationHistoryInputPort {
  execute(conversationId: string): Promise<MessageDTO[]>;
}
