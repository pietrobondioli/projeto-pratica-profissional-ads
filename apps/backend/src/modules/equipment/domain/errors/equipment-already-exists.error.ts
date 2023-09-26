import { ExceptionBase } from '#/be/lib/exceptions/exception.base';

export class EquipmentAlreadyExistsError extends ExceptionBase {
  static readonly message = 'Equipment already exists';

  public readonly code = 'EQUIPMENT.ALREADY_EXISTS';

  constructor(cause?: Error, metadata?: unknown) {
    super(EquipmentAlreadyExistsError.message, cause, metadata);
  }
}
