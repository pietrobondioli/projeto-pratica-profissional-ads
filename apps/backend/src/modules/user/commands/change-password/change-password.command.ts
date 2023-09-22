import { CommandBase } from '#/be/lib/ddd/command.base';

class Payload {
  readonly token: string;
  readonly newPassword: string;
}

export class ChangePasswordCommand extends CommandBase<Payload> {}
