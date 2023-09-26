import { Result } from 'neverthrow';

import { CommandBase } from '#/be/lib/ddd/command.base';

import { UserNotFoundError } from '../../domain/errors/user-not-found.error';

class Payload {
  readonly userId: string;
  readonly newEmail: string;
}

export class ReqChangeEmailCommand extends CommandBase<
  Payload,
  Result<true, UserNotFoundError>
> {}
