import { ForbiddenError } from '#/be/lib/exceptions/forbidden.error';

export class UserNotVerifiedError extends ForbiddenError {
  constructor(cause?: Error, metadata?: unknown) {
    super('Usuário não verificado', cause, metadata);
  }
}
