import { Result } from 'neverthrow';

import { CommandBase } from '#/be/lib/ddd/command.base';
import { ExceptionBase } from '#/be/lib/exceptions/exception.base';

class Payload {
  readonly notificationId: string;
}

export class ReadNotificationCommand extends CommandBase<
  Payload,
  Result<true, ExceptionBase>
> {}
