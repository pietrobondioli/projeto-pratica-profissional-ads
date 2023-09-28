import { Result } from 'neverthrow';

import { UserPayload } from '#/be/lib/application/decorators/auth-user.decorator';
import { CommandBase } from '#/be/lib/ddd/command.base';
import { ExceptionBase } from '#/be/lib/exceptions/exception.base';

class Payload {
  readonly notificationId: string;
  readonly loggedUser: UserPayload;
}

export class ReadNotificationCommand extends CommandBase<
  Payload,
  Result<true, ExceptionBase>
> {}
