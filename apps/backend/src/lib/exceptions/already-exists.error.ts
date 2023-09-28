import { ExceptionBase } from '#/be/lib/exceptions/exception.base';

export abstract class AlreadyExistsError extends ExceptionBase {
  public readonly code = `ALREADY_EXISTS`;

  constructor(entity: string, cause?: Error, metadata?: unknown) {
    super(`${entity} already exists.`, cause, metadata);
  }
}
