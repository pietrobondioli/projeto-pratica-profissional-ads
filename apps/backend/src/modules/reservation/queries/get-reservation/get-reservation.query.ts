import { Result } from 'neverthrow';

import { QueryBase } from '#/be/lib/ddd/query.base';
import { ExceptionBase } from '#/be/lib/exceptions/exception.base';

import { UserPayload } from '#/be/lib/application/decorators/auth-user.decorator';
import { Reservation } from '../../domain/reservation.entity';

class Payload {
  readonly reservationId: string;
  readonly loggedUser: UserPayload;
}

export class GetReservationQuery extends QueryBase<
  Payload,
  Result<Reservation, ExceptionBase>
> {}
