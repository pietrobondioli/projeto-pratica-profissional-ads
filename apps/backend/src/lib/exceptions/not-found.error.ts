import { ExceptionBase } from '#/be/lib/exceptions/exception.base';

export abstract class NotFoundError extends ExceptionBase {
  public readonly code = `NOT_FOUND`;

  constructor(entity: string, cause?: Error, metadata?: unknown) {
    super(`${entity} not found.`, cause, metadata);
  }
}
