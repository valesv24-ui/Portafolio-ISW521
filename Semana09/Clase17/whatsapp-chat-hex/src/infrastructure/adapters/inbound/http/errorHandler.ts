import { Request, Response, NextFunction } from 'express';

/** Middleware transversal: traduce errores de dominio/aplicación a respuestas HTTP */
export function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction): void {
  // eslint-disable-next-line no-console
  console.error(err);
  const status = /no encontrada|inválido|no puede estar vacío|excede/i.test(err.message) ? 400 : 500;
  res.status(status).json({ error: err.message });
}
