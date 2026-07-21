import { ConversationId } from '../value-objects/ConversationId';
import { PhoneNumber } from '../value-objects/PhoneNumber';
import { MessageContent } from '../value-objects/MessageContent';
import { Message } from './Message';
import { DomainEvent } from '../events/DomainEvent';
import { MessageReceivedEvent } from '../events/MessageReceivedEvent';
import { MessageSentEvent } from '../events/MessageSentEvent';

export interface ConversationProps {
  id: ConversationId;
  contact: PhoneNumber;
  messages: Message[];
  lastActivityAt: Date;
}

/**
 * Aggregate Root: Conversation
 * Único punto de entrada para mutar el historial de mensajes de un contacto.
 * Encapsula invariantes (p. ej. una conversación siempre pertenece a un único contacto)
 * y emite eventos de dominio en vez de notificar directamente a infraestructura
 * (así el dominio no depende de detalles de entrega/tiempo real -> Dependency Inversion).
 */
export class Conversation {
  private readonly props: ConversationProps;
  private readonly domainEvents: DomainEvent[] = [];

  private constructor(props: ConversationProps) {
    this.props = props;
  }

  static startNew(contact: PhoneNumber): Conversation {
    return new Conversation({
      id: ConversationId.create(),
      contact,
      messages: [],
      lastActivityAt: new Date(),
    });
  }

  static restore(props: ConversationProps): Conversation {
    return new Conversation(props);
  }

  receiveMessage(content: MessageContent): Message {
    const message = Message.createInbound(this.props.id.toString(), content);
    this.props.messages.push(message);
    this.props.lastActivityAt = message.timestamp;
    this.domainEvents.push(new MessageReceivedEvent(this.props.id.toString(), message.id.toString()));
    return message;
  }

  sendMessage(content: MessageContent): Message {
    const message = Message.createOutbound(this.props.id.toString(), content);
    this.props.messages.push(message);
    this.props.lastActivityAt = message.timestamp;
    this.domainEvents.push(new MessageSentEvent(this.props.id.toString(), message.id.toString()));
    return message;
  }

  pullDomainEvents(): DomainEvent[] {
    const events = [...this.domainEvents];
    this.domainEvents.length = 0;
    return events;
  }

  get id(): ConversationId {
    return this.props.id;
  }

  get contact(): PhoneNumber {
    return this.props.contact;
  }

  get messages(): ReadonlyArray<Message> {
    return this.props.messages;
  }

  get lastActivityAt(): Date {
    return this.props.lastActivityAt;
  }

  toPrimitives() {
    return {
      id: this.props.id.toString(),
      contact: this.props.contact.digits,
      lastActivityAt: this.props.lastActivityAt.toISOString(),
      lastMessage: this.props.messages[this.props.messages.length - 1]?.toPrimitives() ?? null,
      messageCount: this.props.messages.length,
    };
  }
}
