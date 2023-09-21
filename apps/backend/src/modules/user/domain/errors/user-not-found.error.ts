import { ExceptionBase } from '#/be/lib/exceptions/exception.base';

export class UserNotFoundError extends ExceptionBase {
  static readonly message = 'User not found';

  public readonly code = 'USER.NOT_FOUND';

  constructor(cause?: Error, metadata?: unknown) {
    super(UserNotFoundError.message, cause, metadata);
  }
}
