import { CommandBase } from '#/be/lib/ddd/command.base';

class Payload {
  readonly token: string;
}

export class ConfirmAccountCommand extends CommandBase<Payload> {}
