import { ExceptionBase } from '#/be/lib/exceptions/exception.base';
import { HttpStatus } from '@nestjs/common';

export class NotAuthorizedError extends ExceptionBase {
  public readonly httpStatus = HttpStatus.UNAUTHORIZED;

  static readonly message = 'Not authorized';

  constructor(cause?: Error, metadata?: unknown) {
    super(NotAuthorizedError.message, cause, metadata);
  }
}
