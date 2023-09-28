import { NotFoundError } from '#/be/lib/exceptions/not-found.error';

export class UserProfileNotFoundError extends NotFoundError {
  constructor(cause?: Error, metadata?: unknown) {
    super('User Profile', cause, metadata);
  }
}
