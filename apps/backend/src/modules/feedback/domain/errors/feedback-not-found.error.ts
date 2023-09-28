import { NotFoundError } from '#/be/lib/exceptions/not-found.error';

export class FeedbackNotFoundError extends NotFoundError {
  constructor(cause?: Error, metadata?: unknown) {
    super('Feedback', cause, metadata);
  }
}
