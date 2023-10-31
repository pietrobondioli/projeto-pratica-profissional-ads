import { HttpStatus } from '@nestjs/common';

import { ExceptionBase } from '#/be/lib/exceptions/exception.base';

export class NotAuthorizedError extends ExceptionBase {
  public readonly httpStatus = HttpStatus.UNAUTHORIZED;

  static readonly message = 'Não autorizado';

  constructor(cause?: Error, metadata?: unknown) {
    super(NotAuthorizedError.message, cause, metadata);
  }
}
