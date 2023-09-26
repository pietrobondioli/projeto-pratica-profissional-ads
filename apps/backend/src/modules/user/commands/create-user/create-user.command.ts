import { Result } from 'neverthrow';

import { CommandBase } from '#/be/lib/ddd/command.base';
import { EntityID } from '#/be/lib/ddd/entity.base';

import { UserAlreadyExistsError } from '../../domain/errors/user-already-exists.error';

class Payload {
  readonly email: string;
  readonly password: string;
}

export class CreateUserCommand extends CommandBase<
  Payload,
  Result<EntityID, UserAlreadyExistsError>
> {}
