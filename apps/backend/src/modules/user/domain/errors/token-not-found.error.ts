import { NotFoundError } from '#/be/lib/exceptions/not-found.error';

export class TokenNotFoundError extends NotFoundError {
  constructor(cause?: Error, metadata?: unknown) {
    super('Token', cause, metadata);
  }
}
