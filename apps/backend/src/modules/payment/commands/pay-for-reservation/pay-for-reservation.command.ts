import { Result } from 'neverthrow';

import { UserPayload } from '#/be/lib/application/decorators/auth-user.decorator';
import { CommandBase } from '#/be/lib/ddd/command.base';
import { EntityID } from '#/be/lib/ddd/entity.base';
import { ExceptionBase } from '#/be/lib/exceptions/exception.base';
import { PaymentMethod } from '../../domain/payment.entity';

class Payload {
  readonly reservationId: string;
  readonly paymentMethod: PaymentMethod;
  readonly loggedUser: UserPayload;
}

export class PayForReservationCommand extends CommandBase<
  Payload,
  Result<EntityID, ExceptionBase>
> {}
