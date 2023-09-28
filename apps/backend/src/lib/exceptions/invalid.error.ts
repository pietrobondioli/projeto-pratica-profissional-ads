import { ExceptionBase } from '#/be/lib/exceptions/exception.base';

export abstract class InvalidError extends ExceptionBase {
  public readonly code = `INVALID`;

  constructor(entity: string, cause?: Error, metadata?: unknown) {
    super(`Invalid ${entity}.`, cause, metadata);
  }
}
