import { isDev } from '../utils/env.helper';

export interface SerializedException {
  message: string;
  stack?: string;
  cause?: string;
  metadata?: unknown;
}

export abstract class ExceptionBase extends Error {
  abstract httpStatus: number;

  constructor(
    readonly message: string,
    readonly cause?: Error,
    readonly metadata?: unknown,
  ) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
  }

  toJSON(): SerializedException {
    return {
      message: this.message,
      stack: isDev() ? this.stack : undefined,
      cause: isDev() ? JSON.stringify(this.cause) : undefined,
      metadata: isDev() ? this.metadata : undefined,
    };
  }
}
