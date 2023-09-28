import { HttpStatus } from '@nestjs/common';

import { ExceptionBase } from '#/be/lib/exceptions/exception.base';

export abstract class AlreadyExistsError extends ExceptionBase {
  public readonly httpStatus = HttpStatus.CONFLICT;

  constructor(entity: string, cause?: Error, metadata?: unknown) {
    super(`${entity} already exists.`, cause, metadata);
  }
}
