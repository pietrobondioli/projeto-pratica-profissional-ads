import { InvalidError } from '#/be/lib/exceptions/invalid.error';

export class InvalidReservePeriodError extends InvalidError {
  constructor(cause?: Error, metadata?: unknown) {
    super('Período de Reserva', cause, metadata);
  }
}
