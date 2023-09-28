import { Result } from 'neverthrow';

import { CommandBase } from '#/be/lib/ddd/command.base';

import { UserPayload } from '#/be/lib/application/decorators/auth-user.decorator';
import { UserNotFoundError } from '../../domain/errors/user-not-found.error';

class Payload {
  readonly loggedUser: UserPayload;
  readonly newEmail: string;
}

export class ReqChangeEmailCommand extends CommandBase<
  Payload,
  Result<true, UserNotFoundError>
> {}
