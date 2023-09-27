import { QueryResult } from '@nestjs-architects/typed-cqrs';
import { Inject } from '@nestjs/common';
import { IInferredQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Err, Ok } from 'neverthrow';
import { ReservationRepo } from '../../db/reservation.model';
import { ReservationNotFoundError } from '../../domain/errors/reservation-not-found.error';
import { RESERVATION_REPO } from '../../reservation.di-tokens';
import { GetReservationQuery } from './get-reservation.query';

@QueryHandler(GetReservationQuery)
export class GetReservationQueryHandler
  implements IInferredQueryHandler<GetReservationQuery>
{
  constructor(
    @Inject(RESERVATION_REPO)
    private readonly reservationRepo: ReservationRepo,
  ) {}

  async execute(
    query: GetReservationQuery,
  ): Promise<QueryResult<GetReservationQuery>> {
    const { reservationId } = query.payload;

    const reservation = await this.reservationRepo.findOneBy({
      id: reservationId,
    });

    if (!reservation) {
      return new Err(new ReservationNotFoundError());
    }

    return new Ok(reservation);
  }
}
