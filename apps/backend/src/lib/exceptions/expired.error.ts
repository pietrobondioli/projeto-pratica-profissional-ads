import { HttpStatus } from '@nestjs/common';

import { ExceptionBase } from '#/be/lib/exceptions/exception.base';

export abstract class ExpiredError extends ExceptionBase {
  public readonly httpStatus = HttpStatus.GONE;

  constructor(entity: string, cause?: Error, metadata?: unknown) {
    super(`${entity} expired.`, cause, metadata);
  }
}
