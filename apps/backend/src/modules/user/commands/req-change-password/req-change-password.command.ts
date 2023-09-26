import { Result } from 'neverthrow';

import { CommandBase } from '#/be/lib/ddd/command.base';

import { UserNotFoundError } from '../../domain/errors/user-not-found.error';

class Payload {
  readonly email: string;
}

export class ReqChangePasswordCommand extends CommandBase<
  Payload,
  Result<true, UserNotFoundError>
> {}
