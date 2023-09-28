import { NotFoundError } from '#/be/lib/exceptions/not-found.error';

export class ReservationNotFoundError extends NotFoundError {
  constructor(cause?: Error, metadata?: unknown) {
    super('Reservation', cause, metadata);
  }
}
