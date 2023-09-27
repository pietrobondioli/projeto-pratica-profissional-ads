import { ExceptionBase } from '#/be/lib/exceptions/exception.base';

export class TargetUserNotFoundError extends ExceptionBase {
  static readonly message = 'Target user not found';

  public readonly code = 'TARGET_USER.NOT_FOUND';

  constructor(cause?: Error, metadata?: unknown) {
    super(TargetUserNotFoundError.message, cause, metadata);
  }
}
