import { ConversationSummaryDTO } from '../../dto/ConversationSummaryDTO';

export interface ListConversationsInputPort {
  execute(): Promise<ConversationSummaryDTO[]>;
}
