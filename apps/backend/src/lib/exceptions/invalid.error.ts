import { ExceptionBase } from '#/be/lib/exceptions/exception.base';
import { HttpStatus } from '@nestjs/common';

export abstract class InvalidError extends ExceptionBase {
  public readonly httpStatus = HttpStatus.BAD_REQUEST;

  constructor(entity: string, cause?: Error, metadata?: unknown) {
    super(`Invalid ${entity}.`, cause, metadata);
  }
}
