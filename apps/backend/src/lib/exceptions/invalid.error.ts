import { HttpStatus } from '@nestjs/common';

import { ExceptionBase } from '#/be/lib/exceptions/exception.base';

export abstract class InvalidError extends ExceptionBase {
  public readonly httpStatus = HttpStatus.BAD_REQUEST;

  constructor(entity: string, cause?: Error, metadata?: unknown) {
    super(`${entity} inválido.`, cause, metadata);
  }
}
