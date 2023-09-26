import { ExceptionBase } from '#/be/lib/exceptions/exception.base';

export class EquipmentNotFoundError extends ExceptionBase {
  static readonly message = 'Equipment not found';

  public readonly code = 'EQUIPMENT.NOT_FOUND';

  constructor(cause?: Error, metadata?: unknown) {
    super(EquipmentNotFoundError.message, cause, metadata);
  }
}
