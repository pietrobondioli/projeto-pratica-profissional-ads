import { NotFoundError } from '#/be/lib/exceptions/not-found.error';

export class TargetUserNotFoundError extends NotFoundError {
  constructor(cause?: Error, metadata?: unknown) {
    super(`Destinatário`, cause, metadata);
  }
}
