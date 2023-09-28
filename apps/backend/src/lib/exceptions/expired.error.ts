import { ExceptionBase } from '#/be/lib/exceptions/exception.base';

export abstract class ExpiredError extends ExceptionBase {
  public readonly code = `EXPIRED`;

  constructor(entity: string, cause?: Error, metadata?: unknown) {
    super(`${entity} expired.`, cause, metadata);
  }
}
