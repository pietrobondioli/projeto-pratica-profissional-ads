import { Result } from 'neverthrow';

import { UserPayload } from '#/be/lib/application/decorators/auth-user.decorator';
import { CommandBase } from '#/be/lib/ddd/command.base';

import { UserNotFoundError } from '../../domain/errors/user-not-found.error';

class Payload {
  readonly loggedUser: UserPayload;
  readonly newEmail: string;
}

export class ReqChangeEmailCommand extends CommandBase<
  Payload,
  Result<true, UserNotFoundError>
> {}
