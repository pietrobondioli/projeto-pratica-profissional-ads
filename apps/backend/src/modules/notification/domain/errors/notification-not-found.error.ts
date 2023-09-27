import { ExceptionBase } from '#/be/lib/exceptions/exception.base';

export class NotificationNotFoundError extends ExceptionBase {
  static readonly message = 'Notification not found';

  public readonly code = 'NOTIFICATION.NOT_FOUND';

  constructor(cause?: Error, metadata?: unknown) {
    super(NotificationNotFoundError.message, cause, metadata);
  }
}
