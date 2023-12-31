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
    const { reservationId, loggedUser } = query.payload;

    const reservation = await this.reservationRepo.findOne({
      where: [
        {
          id: reservationId,
          renter: {
            id: loggedUser.id,
          },
        },
        {
          id: reservationId,
          rentee: {
            id: loggedUser.id,
          },
        },
      ],
      relations: ['equipment', 'renter', 'rentee', 'payment', 'feedbacks'],
    });

    if (!reservation) {
      return new Err(new ReservationNotFoundError());
    }

    return new Ok(reservation);
  }
}
