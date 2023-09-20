import { CommandBase } from '#/be/lib/ddd/command.base';

class Payload {
  readonly email: string;
  readonly password: string;
}

export class CreateUserCommand extends CommandBase<Payload> {}
