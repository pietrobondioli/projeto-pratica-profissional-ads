import { Result } from 'neverthrow';

import { UserPayload } from '#/be/lib/application/decorators/auth-user.decorator';
import { CommandBase } from '#/be/lib/ddd/command.base';
import { EntityID } from '#/be/lib/ddd/entity.base';

import { PhotoNotFoundError } from '../../domain/errors/photo-not-found.error';

class Payload {
  readonly title: string;
  readonly description: string;
  readonly photoId: string;
  readonly pricePerDay: number;
  readonly loggedUser: UserPayload;
}

export class CreateEquipmentCommand extends CommandBase<
  Payload,
  Result<EntityID, PhotoNotFoundError>
> {}
