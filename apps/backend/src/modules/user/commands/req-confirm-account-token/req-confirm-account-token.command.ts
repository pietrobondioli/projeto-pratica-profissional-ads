import { Result } from 'neverthrow';

import { CommandBase } from '#/be/lib/ddd/command.base';
import { EntityID } from '#/be/lib/ddd/entity.base';

import { UserNotFoundError } from '../../domain/errors/user-not-found.error';

class Payload {
  readonly email: string;
}

export class ReqConfirmAccountTokenCommand extends CommandBase<
  Payload,
  Result<EntityID, UserNotFoundError>
> {}
