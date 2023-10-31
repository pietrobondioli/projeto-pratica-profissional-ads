import { AlreadyExistsError } from '#/be/lib/exceptions/already-exists.error';

export class EquipmentAlreadyExistsError extends AlreadyExistsError {
  constructor(cause?: Error, metadata?: unknown) {
    super('Equipamento', cause, metadata);
  }
}
