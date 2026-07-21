import { DomainEvent } from './DomainEvent';

export class MessageSentEvent implements DomainEvent {
  readonly occurredAt: Date = new Date();
  readonly eventName = 'MessageSent';

  constructor(
    public readonly conversationId: string,
    public readonly messageId: string,
  ) {}
}
