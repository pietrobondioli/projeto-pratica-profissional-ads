import { AlreadyExistsError } from '#/be/lib/exceptions/already-exists.error';

export class UserAlreadyExistsError extends AlreadyExistsError {
  constructor(email: string, cause?: Error, metadata?: unknown) {
    super(`User (${email})`, cause, metadata);
  }
}
