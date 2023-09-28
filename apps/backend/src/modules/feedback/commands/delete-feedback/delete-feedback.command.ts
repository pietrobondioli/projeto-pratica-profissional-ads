import { Result } from 'neverthrow';

import { UserPayload } from '#/be/lib/application/decorators/auth-user.decorator';
import { CommandBase } from '#/be/lib/ddd/command.base';
import { ExceptionBase } from '#/be/lib/exceptions/exception.base';

class Payload {
  readonly feedbackId: string;
  readonly loggedUser: UserPayload;
}

export class DeleteFeedbackCommand extends CommandBase<
  Payload,
  Result<true, ExceptionBase>
> {}
