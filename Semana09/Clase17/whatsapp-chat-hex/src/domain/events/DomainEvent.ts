/** Contrato base para todo evento de dominio */
export interface DomainEvent {
  readonly occurredAt: Date;
  readonly eventName: string;
}
