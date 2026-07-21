import { randomUUID } from 'crypto';

/** Value Object: identificador único de una conversación */
export class ConversationId {
  private readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  static create(): ConversationId {
    return new ConversationId(randomUUID());
  }

  static fromString(value: string): ConversationId {
    if (!value || value.trim().length === 0) {
      throw new Error('ConversationId no puede estar vacío');
    }
    return new ConversationId(value);
  }

  equals(other: ConversationId): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }
}
