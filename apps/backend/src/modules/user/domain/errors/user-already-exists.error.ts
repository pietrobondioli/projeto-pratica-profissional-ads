import { AlreadyExistsError } from '#/be/lib/exceptions/already-exists.error';

export class UserAlreadyExistsError extends AlreadyExistsError {
  constructor(cause?: Error, metadata?: unknown) {
    super('User', cause, metadata);
  }
}
