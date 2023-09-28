import { HttpStatus } from '@nestjs/common';

import { ExceptionBase } from '#/be/lib/exceptions/exception.base';

export class GenericError extends ExceptionBase {
  public readonly httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;

  constructor(
    message: string,
    cause?: Error,
    originalStack?: string,
    httpStatus?: string | number,
    metadata?: unknown,
  ) {
    super(
      message ?? cause?.message ?? `Something went wrong.`,
      cause,
      metadata,
    );
    if (originalStack) {
      this.stack = originalStack;
    }
    if (httpStatus) {
      this.httpStatus = httpStatus as any;
    }
  }
}
