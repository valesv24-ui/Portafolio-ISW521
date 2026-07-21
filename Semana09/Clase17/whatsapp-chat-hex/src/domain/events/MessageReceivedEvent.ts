import { DomainEvent } from './DomainEvent';

export class MessageReceivedEvent implements DomainEvent {
  readonly occurredAt: Date = new Date();
  readonly eventName = 'MessageReceived';

  constructor(
    public readonly conversationId: string,
    public readonly messageId: string,
  ) {}
}
