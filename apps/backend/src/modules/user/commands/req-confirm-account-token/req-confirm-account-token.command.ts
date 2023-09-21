import { CommandBase } from '#/be/lib/ddd/command.base';

class Payload {
  readonly email: string;
}

export class ReqConfirmAccountTokenCommand extends CommandBase<Payload> {}
