import { ExceptionBase } from '#/be/lib/exceptions/exception.base';

export class InvalidReservePeriodError extends ExceptionBase {
  static readonly message = 'Invalid reserve period, please check the dates.';

  public readonly code = 'RESERVATION.INVALID_RESERVE_PERIOD';

  constructor(cause?: Error, metadata?: unknown) {
    super(InvalidReservePeriodError.message, cause, metadata);
  }
}
