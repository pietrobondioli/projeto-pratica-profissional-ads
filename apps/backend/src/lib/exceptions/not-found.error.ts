import { HttpStatus } from '@nestjs/common';

import { ExceptionBase } from '#/be/lib/exceptions/exception.base';

export abstract class NotFoundError extends ExceptionBase {
  public readonly httpStatus = HttpStatus.NOT_FOUND;

  constructor(entity: string, cause?: Error, metadata?: unknown) {
    super(`${entity} not found.`, cause, metadata);
  }
}
