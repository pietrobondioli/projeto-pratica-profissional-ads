import { Result } from 'neverthrow';

import { CommandBase } from '#/be/lib/ddd/command.base';
import { EntityID } from '#/be/lib/ddd/entity.base';

import { TargetUserNotFoundError } from '../../domain/errors/target-user-not-found.error';

class Payload {
  readonly withUserId: string;
  readonly message: string;
}

export class CreateChatCommand extends CommandBase<
  Payload,
  Result<EntityID, TargetUserNotFoundError>
> {}
