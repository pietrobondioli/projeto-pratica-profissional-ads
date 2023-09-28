import { Result } from 'neverthrow';

import { QueryBase } from '#/be/lib/ddd/query.base';
import { ExceptionBase } from '#/be/lib/exceptions/exception.base';

import { Reservation } from '../../domain/reservation.entity';

class Payload {
  readonly reservationId: string;
}

export class GetReservationQuery extends QueryBase<
  Payload,
  Result<Reservation, ExceptionBase>
> {}
