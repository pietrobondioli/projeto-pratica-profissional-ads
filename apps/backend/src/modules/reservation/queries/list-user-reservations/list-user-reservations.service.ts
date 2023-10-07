import { QueryResult } from '@nestjs-architects/typed-cqrs';
import { Inject } from '@nestjs/common';
import { IInferredQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Ok } from 'neverthrow';

import { ReservationRepo } from '../../db/reservation.model';
import { RESERVATION_REPO } from '../../reservation.di-tokens';

import { ListUserReservationsQuery } from './list-user-reservations.query';

@QueryHandler(ListUserReservationsQuery)
export class ListUserReservationsQueryHandler
  implements IInferredQueryHandler<ListUserReservationsQuery>
{
  constructor(
    @Inject(RESERVATION_REPO)
    private readonly reservationRepo: ReservationRepo,
  ) {}

  async execute(
    query: ListUserReservationsQuery,
  ): Promise<QueryResult<ListUserReservationsQuery>> {
    const { page, limit, order, loggedUser } = query.payload;

    const [reservations, total] = await this.reservationRepo.findAndCount({
      where: [
        {
          renter: {
            id: loggedUser.id,
          },
        },
        {
          rentee: {
            id: loggedUser.id,
          },
        },
      ],
      skip: Math.max(0, (page - 1) * limit),
      take: limit,
      order: {
        [order.field]: order.param,
      },
      relations: ['equipment', 'renter', 'rentee', 'payment'],
    });

    return new Ok({
      items: reservations,
      page,
      limit,
      total: reservations.length,
      hasMore: page * limit < total,
    });
  }
}
