import { ExceptionBase } from '#/be/lib/exceptions/exception.base';

export class GenericError extends ExceptionBase {
  public readonly code = `SOMETHING_WENT_WRONG`;

  constructor(cause?: Error, originalStack?: string, metadata?: unknown) {
    super(cause?.message ?? `Something went wrong.`, cause, metadata);
    if (originalStack) {
      this.stack = originalStack;
    }
  }
}
