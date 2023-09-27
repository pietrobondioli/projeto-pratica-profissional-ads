import { ExceptionBase } from '#/be/lib/exceptions/exception.base';

export class NotAuthorizedError extends ExceptionBase {
  static readonly message = 'Not authorized';

  public readonly code = 'NOT_AUTHORIZED';

  constructor(cause?: Error, metadata?: unknown) {
    super(NotAuthorizedError.message, cause, metadata);
  }
}
