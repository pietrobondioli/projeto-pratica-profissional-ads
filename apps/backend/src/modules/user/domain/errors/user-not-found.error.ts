import { NotFoundError } from '#/be/lib/exceptions/not-found.error';

export class UserNotFoundError extends NotFoundError {
  constructor(cause?: Error, metadata?: unknown) {
    super('Usuário', cause, metadata);
  }
}
