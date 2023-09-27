import { ExceptionBase } from '#/be/lib/exceptions/exception.base';

export class ReservationNotFoundError extends ExceptionBase {
  static readonly message = 'Reservation not found';

  public readonly code = 'RESERVATION.NOT_FOUND';

  constructor(cause?: Error, metadata?: unknown) {
    super(ReservationNotFoundError.message, cause, metadata);
  }
}
