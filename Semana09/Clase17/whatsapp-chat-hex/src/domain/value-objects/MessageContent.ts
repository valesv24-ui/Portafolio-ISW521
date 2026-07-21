const MAX_LENGTH = 4096;

/** Value Object: contenido textual de un mensaje, con sus invariantes de negocio */
export class MessageContent {
  private readonly value: string;

  constructor(rawValue: string) {
    const trimmed = (rawValue ?? '').trim();
    if (trimmed.length === 0) {
      throw new Error('El contenido del mensaje no puede estar vacío');
    }
    if (trimmed.length > MAX_LENGTH) {
      throw new Error(`El contenido del mensaje excede ${MAX_LENGTH} caracteres`);
    }
    this.value = trimmed;
  }

  get text(): string {
    return this.value;
  }

  toString(): string {
    return this.value;
  }
}
