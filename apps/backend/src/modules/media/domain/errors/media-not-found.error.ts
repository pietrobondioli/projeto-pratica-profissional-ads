import { NotFoundError } from '#/be/lib/exceptions/not-found.error';

export class MediaNotFoundError extends NotFoundError {
  constructor(cause?: Error, metadata?: unknown) {
    super('Media', cause, metadata);
  }
}
