import { CommandBase } from '#/be/lib/ddd/command.base';
import { Result } from 'neverthrow';

class Payload {
  readonly token: string;
}

export class ConfirmAccountCommand extends CommandBase<
  Payload,
  Result<true, Error>
> {}
