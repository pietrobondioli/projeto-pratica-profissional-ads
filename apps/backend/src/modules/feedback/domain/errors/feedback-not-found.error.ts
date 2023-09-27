import { ExceptionBase } from '#/be/lib/exceptions/exception.base';

export class FeedbackNotFoundError extends ExceptionBase {
  static readonly message = 'Feedback not found';

  public readonly code = 'FEEDBACK.NOT_FOUND';

  constructor(cause?: Error, metadata?: unknown) {
    super(FeedbackNotFoundError.message, cause, metadata);
  }
}
