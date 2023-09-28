import { AlreadyExistsError } from '#/be/lib/exceptions/already-exists.error';

export class FeedbackAlreadyExistsError extends AlreadyExistsError {
  constructor(cause?: Error, metadata?: unknown) {
    super(`Feedback`, cause, metadata);
  }
}
