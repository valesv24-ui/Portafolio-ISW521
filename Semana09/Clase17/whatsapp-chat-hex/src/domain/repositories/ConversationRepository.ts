import { Conversation } from '../entities/Conversation';
import { ConversationId } from '../value-objects/ConversationId';
import { PhoneNumber } from '../value-objects/PhoneNumber';

/**
 * Puerto de salida (secundario) del dominio.
 * El dominio depende de esta abstracción; la infraestructura la implementa
 * (Dependency Inversion Principle). Cualquier motor de persistencia
 * (memoria, Mongo, Postgres...) puede sustituirse sin tocar dominio/aplicación.
 */
export interface ConversationRepository {
  findById(id: ConversationId): Promise<Conversation | null>;
  findByContact(contact: PhoneNumber): Promise<Conversation | null>;
  findAll(): Promise<Conversation[]>;
  save(conversation: Conversation): Promise<void>;
}
