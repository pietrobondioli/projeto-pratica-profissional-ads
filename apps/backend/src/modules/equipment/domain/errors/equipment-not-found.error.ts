import { NotFoundError } from '#/be/lib/exceptions/not-found.error';

export class EquipmentNotFoundError extends NotFoundError {
  constructor(cause?: Error, metadata?: unknown) {
    super('Equipment', cause, metadata);
  }
}
