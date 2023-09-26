import { CommandBase } from '#/be/lib/ddd/command.base';
import { Result } from 'neverthrow';
import { TokenInvalidError } from '../../domain/errors/token-invalid.error';
import { TokenNotFoundError } from '../../domain/errors/token-not-found.error';

class Payload {
  readonly token: string;
}

export class ChangeEmailCommand extends CommandBase<
  Payload,
  Result<true, TokenNotFoundError | TokenInvalidError>
> {}
