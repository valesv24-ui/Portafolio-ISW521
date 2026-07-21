import { MessageId } from '../value-objects/MessageId';
import { MessageContent } from '../value-objects/MessageContent';
import { MessageDirection } from '../value-objects/MessageDirection';
import { MessageStatus } from '../value-objects/MessageStatus';

export interface MessageProps {
  id: MessageId;
  conversationId: string;
  content: MessageContent;
  direction: MessageDirection;
  status: MessageStatus;
  timestamp: Date;
}

/**
 * Entidad: Message
 * Forma parte del agregado Conversation. No se persiste ni manipula fuera de él
 * (regla de agregados de DDD): toda mutación pasa por Conversation.
 */
export class Message {
  private readonly props: MessageProps;

  private constructor(props: MessageProps) {
    this.props = props;
  }

  static createOutbound(conversationId: string, content: MessageContent): Message {
    return new Message({
      id: MessageId.create(),
      conversationId,
      content,
      direction: MessageDirection.OUTBOUND,
      status: MessageStatus.PENDING,
      timestamp: new Date(),
    });
  }

  static createInbound(conversationId: string, content: MessageContent): Message {
    return new Message({
      id: MessageId.create(),
      conversationId,
      content,
      direction: MessageDirection.INBOUND,
      status: MessageStatus.DELIVERED,
      timestamp: new Date(),
    });
  }

  static restore(props: MessageProps): Message {
    return new Message(props);
  }

  markAs(status: MessageStatus): void {
    this.props.status = status;
  }

  get id(): MessageId {
    return this.props.id;
  }

  get content(): MessageContent {
    return this.props.content;
  }

  get direction(): MessageDirection {
    return this.props.direction;
  }

  get status(): MessageStatus {
    return this.props.status;
  }

  get timestamp(): Date {
    return this.props.timestamp;
  }

  toPrimitives() {
    return {
      id: this.props.id.toString(),
      conversationId: this.props.conversationId,
      content: this.props.content.text,
      direction: this.props.direction,
      status: this.props.status,
      timestamp: this.props.timestamp.toISOString(),
    };
  }
}
