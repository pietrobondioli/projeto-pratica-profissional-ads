import { NotFoundError } from '#/be/lib/exceptions/not-found.error';

export class ChatNotFoundError extends NotFoundError {
  constructor(cause?: Error, metadata?: unknown) {
    super('Chat', cause, metadata);
  }
}
