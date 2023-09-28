import { HttpStatus } from '@nestjs/common';

import { ExceptionBase } from '#/be/lib/exceptions/exception.base';

export abstract class ForbiddenError extends ExceptionBase {
  public readonly httpStatus = HttpStatus.FORBIDDEN;

  constructor(message: string, cause?: Error, metadata?: unknown) {
    super(message ?? cause?.message ?? `Forbidden`, cause, metadata);
  }
}
