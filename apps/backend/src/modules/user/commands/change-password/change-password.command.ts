import { Result } from 'neverthrow';

import { CommandBase } from '#/be/lib/ddd/command.base';

import { TokenInvalidError } from '../../domain/errors/token-invalid.error';
import { TokenNotFoundError } from '../../domain/errors/token-not-found.error';

class Payload {
  readonly token: string;
  readonly newPassword: string;
}

export class ChangePasswordCommand extends CommandBase<
  Payload,
  Result<true, TokenNotFoundError | TokenInvalidError>
> {}
