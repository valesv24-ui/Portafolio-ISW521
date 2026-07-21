/**
 * Value Object: PhoneNumber
 * Representa el identificador de un contacto, como número de dígitos (ej. "521234567890").
 * Es inmutable y se valida a sí mismo en el constructor (invariante de dominio).
 *
 * Deliberadamente NO conoce sufijos de proveedor como "@c.us" (whatsapp-web.js)
 * o "@s.whatsapp.net" (Baileys): ese es un detalle de infraestructura. Cada
 * adaptador de WhatsAppGateway construye el identificador que su librería
 * concreta necesita a partir de `digits`. Así el dominio no depende de qué
 * librería de WhatsApp se use (Dependency Inversion).
 */
export class PhoneNumber {
  private readonly value: string;

  constructor(rawValue: string) {
    const normalized = PhoneNumber.normalize(rawValue);
    if (!PhoneNumber.isValid(normalized)) {
      throw new Error(`PhoneNumber inválido: "${rawValue}"`);
    }
    this.value = normalized;
  }

  private static normalize(rawValue: string): string {
    // Acepta "521234567890", "521234567890@c.us" o "521234567890@s.whatsapp.net"
    // y se queda sólo con los dígitos.
    return rawValue.trim().split('@')[0].replace(/\D/g, '');
  }

  private static isValid(value: string): boolean {
    return /^\d{7,15}$/.test(value);
  }

  /** Dígitos del número, sin ningún sufijo de proveedor */
  get digits(): string {
    return this.value;
  }

  equals(other: PhoneNumber): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }
}
