import { ExceptionBase } from '#/be/lib/exceptions/exception.base';
import { HttpStatus } from '@nestjs/common';

export class ReservationNotFinalizedYetError extends ExceptionBase {
  public readonly httpStatus = HttpStatus.BAD_REQUEST;

  static readonly message =
    'Reserva ainda não finalizada, você não pode deixar feedback.';

  constructor(cause?: Error, metadata?: unknown) {
    super(ReservationNotFinalizedYetError.message, cause, metadata);
  }
}
