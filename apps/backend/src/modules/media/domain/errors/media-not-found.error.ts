import { NotFoundError } from '#/be/lib/exceptions/not-found.error';

export class MediaNotFoundError extends NotFoundError {
  constructor(cause?: Error, metadata?: unknown) {
    super('Mídia', cause, metadata);
  }
}
