import { ExceptionBase } from '#/be/lib/exceptions/exception.base';

export class PhotoNotFoundError extends ExceptionBase {
  static readonly message = 'Photo not found';

  public readonly code = 'PHOTO.NOT_FOUND';

  constructor(cause?: Error, metadata?: unknown) {
    super(PhotoNotFoundError.message, cause, metadata);
  }
}
