import { NotFoundError } from '#/be/lib/exceptions/not-found.error';

export class NotificationNotFoundError extends NotFoundError {
  constructor(cause?: Error, metadata?: unknown) {
    super('Notificação', cause, metadata);
  }
}
