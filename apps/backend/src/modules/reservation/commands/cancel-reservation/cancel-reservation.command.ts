import { Result } from 'neverthrow';

import { CommandBase } from '#/be/lib/ddd/command.base';
import { ExceptionBase } from '#/be/lib/exceptions/exception.base';

class Payload {
  readonly reservationId: string;
}

export class CancelReservationCommand extends CommandBase<
  Payload,
  Result<true, ExceptionBase>
> {}
