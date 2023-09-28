import { Result } from 'neverthrow';

import { UserPayload } from '#/be/lib/application/decorators/auth-user.decorator';
import { CommandBase } from '#/be/lib/ddd/command.base';
import { EntityID } from '#/be/lib/ddd/entity.base';

import { TargetUserNotFoundError } from '../../domain/errors/target-user-not-found.error';

class Payload {
  readonly withUserId: string;
  readonly message: string;
  readonly loggedUser: UserPayload;
}

export class CreateChatCommand extends CommandBase<
  Payload,
  Result<EntityID, TargetUserNotFoundError>
> {}
