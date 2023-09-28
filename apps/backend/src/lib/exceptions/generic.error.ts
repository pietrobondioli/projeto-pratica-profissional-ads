import { ExceptionBase } from '#/be/lib/exceptions/exception.base';

export class GenericError extends ExceptionBase {
  public readonly code = `SOMETHING_WENT_WRONG`;

  constructor(cause?: Error, metadata?: unknown) {
    super(`Something went wrong.`, cause, metadata);
  }
}
