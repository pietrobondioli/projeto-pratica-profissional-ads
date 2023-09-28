import { Result } from 'neverthrow';

import { UserPayload } from '#/be/lib/application/decorators/auth-user.decorator';
import { CommandBase } from '#/be/lib/ddd/command.base';
import { EntityID } from '#/be/lib/ddd/entity.base';
import { ExceptionBase } from '#/be/lib/exceptions/exception.base';

class Payload {
  readonly feedbackId: string;
  readonly rating: number;
  readonly comment: string;
  readonly loggedUser: UserPayload;
}

export class UpdateFeedbackCommand extends CommandBase<
  Payload,
  Result<EntityID, ExceptionBase>
> {}
