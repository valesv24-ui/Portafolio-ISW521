import { ConversationRepository } from '../../../../domain/repositories/ConversationRepository';
import { Conversation } from '../../../../domain/entities/Conversation';
import { ConversationId } from '../../../../domain/value-objects/ConversationId';
import { PhoneNumber } from '../../../../domain/value-objects/PhoneNumber';

/**
 * Adaptador de salida: implementación en memoria del puerto ConversationRepository.
 * Sirve para desarrollo/pruebas y como demostración de OCP: se puede sustituir
 * por MongoConversationRepository, PostgresConversationRepository, etc. sin tocar
 * dominio ni aplicación, siempre que implementen la misma interfaz.
 */
export class InMemoryConversationRepository implements ConversationRepository {
  private readonly store = new Map<string, Conversation>();

  async findById(id: ConversationId): Promise<Conversation | null> {
    return this.store.get(id.toString()) ?? null;
  }

  async findByContact(contact: PhoneNumber): Promise<Conversation | null> {
    for (const conversation of this.store.values()) {
      if (conversation.contact.equals(contact)) {
        return conversation;
      }
    }
    return null;
  }

  async findAll(): Promise<Conversation[]> {
    return [...this.store.values()];
  }

  async save(conversation: Conversation): Promise<void> {
    this.store.set(conversation.id.toString(), conversation);
  }
}
