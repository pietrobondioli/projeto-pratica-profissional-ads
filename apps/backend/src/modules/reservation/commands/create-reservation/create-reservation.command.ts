import { Result } from 'neverthrow';

import { UserPayload } from '#/be/lib/application/decorators/auth-user.decorator';
import { CommandBase } from '#/be/lib/ddd/command.base';
import { EntityID } from '#/be/lib/ddd/entity.base';
import { ExceptionBase } from '#/be/lib/exceptions/exception.base';

class Payload {
  readonly equipmentId: string;
  readonly startDate: Date;
  readonly endDate: Date;
  readonly loggedUser: UserPayload;
}

export class CreateReservationCommand extends CommandBase<
  Payload,
  Result<EntityID, ExceptionBase>
> {}
