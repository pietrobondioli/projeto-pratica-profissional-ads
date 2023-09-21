import { CommandBase } from '#/be/lib/ddd/command.base';

class Payload {
  readonly userId: string;
  readonly newEmail: string;
}

export class ReqChangeEmailCommand extends CommandBase<Payload> {}
