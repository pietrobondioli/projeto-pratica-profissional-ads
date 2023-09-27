import { ExceptionBase } from '#/be/lib/exceptions/exception.base';

export class InvalidCredentialsError extends ExceptionBase {
  static readonly message = 'Invalid credentials';

  public readonly code = 'CREDENTIALS.INVALID';

  constructor(cause?: Error, metadata?: unknown) {
    super(InvalidCredentialsError.message, cause, metadata);
  }
}
