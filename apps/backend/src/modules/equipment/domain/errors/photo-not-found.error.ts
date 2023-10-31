import { NotFoundError } from '#/be/lib/exceptions/not-found.error';

export class PhotoNotFoundError extends NotFoundError {
  constructor(cause?: Error, metadata?: unknown) {
    super('Foto', cause, metadata);
  }
}
