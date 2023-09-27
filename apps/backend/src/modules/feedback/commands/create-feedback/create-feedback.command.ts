import { Result } from 'neverthrow';

import { CommandBase } from '#/be/lib/ddd/command.base';
import { EntityID } from '#/be/lib/ddd/entity.base';
import { ExceptionBase } from '#/be/lib/exceptions/exception.base';

class Payload {
  readonly reservationId: string;
  readonly rating: number;
  readonly comment: string;
}

export class CreateFeedbackCommand extends CommandBase<
  Payload,
  Result<EntityID, ExceptionBase>
> {}
