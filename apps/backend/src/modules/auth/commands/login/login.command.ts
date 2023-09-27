import { Result } from 'neverthrow';

import { CommandBase } from '#/be/lib/ddd/command.base';
import { ExceptionBase } from '#/be/lib/exceptions/exception.base';

class Payload {
  readonly email: string;
  readonly password: string;
}

export class LoginCommand extends CommandBase<
  Payload,
  Result<{ token: string }, ExceptionBase>
> {}
