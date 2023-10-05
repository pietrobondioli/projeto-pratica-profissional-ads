import { Result } from 'neverthrow';

import { CommandBase } from '#/be/lib/ddd/command.base';

import { UserPayload } from '#/be/lib/application/decorators/auth-user.decorator';
import { EquipmentNotFoundError } from '../../domain/errors/equipment-not-found.error';

class Payload {
  readonly equipmentId: string;
  readonly loggedUser: UserPayload;
}

export class DeleteEquipmentCommand extends CommandBase<
  Payload,
  Result<true, EquipmentNotFoundError>
> {}
