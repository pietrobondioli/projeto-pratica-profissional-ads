import { ExceptionBase } from '#/be/lib/exceptions/exception.base';

export class ChatNotFoundError extends ExceptionBase {
  static readonly message = 'Chat not found';

  public readonly code = 'CHAT.NOT_FOUND';

  constructor(cause?: Error, metadata?: unknown) {
    super(ChatNotFoundError.message, cause, metadata);
  }
}
