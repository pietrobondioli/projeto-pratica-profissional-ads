import { Result } from 'neverthrow';

import {
  PaginatedQueryBase,
  PaginatedQueryPayloadBase,
  PaginatedQueryResultBase,
} from '#/be/lib/ddd/query.base';
import { ExceptionBase } from '#/be/lib/exceptions/exception.base';
import { Reservation } from '../../domain/reservation.entity';

class Payload extends PaginatedQueryPayloadBase {}

export class ListUserReservationsQuery extends PaginatedQueryBase<
  Payload,
  Result<PaginatedQueryResultBase<Reservation>, ExceptionBase>
> {}
