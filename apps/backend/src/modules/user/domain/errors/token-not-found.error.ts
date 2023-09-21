import { ExceptionBase } from '#/be/lib/exceptions/exception.base';

export class TokenNotFoundError extends ExceptionBase {
  static readonly message = 'Token not found';

  public readonly code = 'TOKEN.NOT_FOUND';

  constructor(cause?: Error, metadata?: unknown) {
    super(TokenNotFoundError.message, cause, metadata);
  }
}
