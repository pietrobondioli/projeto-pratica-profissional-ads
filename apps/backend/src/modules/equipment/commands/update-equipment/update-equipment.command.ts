import { Result } from 'neverthrow';

import { CommandBase } from '#/be/lib/ddd/command.base';
import { EntityID } from '#/be/lib/ddd/entity.base';

import { UserPayload } from '#/be/lib/application/decorators/auth-user.decorator';
import { EquipmentNotFoundError } from '../../domain/errors/equipment-not-found.error';
import { PhotoNotFoundError } from '../../domain/errors/photo-not-found.error';

class Payload {
  readonly equipmentId: string;
  readonly title?: string;
  readonly description?: string;
  readonly photoId?: string;
  readonly pricePerDay?: number;
  readonly availabilityStatus?: boolean;
  readonly loggedUser: UserPayload;
}

export class UpdateEquipmentCommand extends CommandBase<
  Payload,
  Result<EntityID, PhotoNotFoundError | EquipmentNotFoundError>
> {}
