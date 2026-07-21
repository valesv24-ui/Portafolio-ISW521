import { randomUUID } from 'crypto';

/** Value Object: identificador único de un mensaje */
export class MessageId {
  private readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  static create(): MessageId {
    return new MessageId(randomUUID());
  }

  static fromString(value: string): MessageId {
    if (!value || value.trim().length === 0) {
      throw new Error('MessageId no puede estar vacío');
    }
    return new MessageId(value);
  }

  equals(other: MessageId): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }
}
