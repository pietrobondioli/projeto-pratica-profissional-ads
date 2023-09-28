import { InvalidError } from '#/be/lib/exceptions/invalid.error';

export class TokenInvalidError extends InvalidError {
  constructor(cause?: Error, metadata?: unknown) {
    super('Token', cause, metadata);
  }
}
