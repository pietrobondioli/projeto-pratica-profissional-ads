import { ExceptionBase } from '#/be/lib/exceptions/exception.base';

export class TokenInvalidError extends ExceptionBase {
  static readonly message = 'Token invalid';

  public readonly code = 'TOKEN.INVALID';

  constructor(cause?: Error, metadata?: unknown) {
    super(TokenInvalidError.message, cause, metadata);
  }
}
