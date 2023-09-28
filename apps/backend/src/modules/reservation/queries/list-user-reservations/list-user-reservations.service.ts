import { Inject } from '@nestjs/common';
import { IInferredQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { QueryResult } from '@nestjs-architects/typed-cqrs';
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
    const { page, limit, order } = query.payload;

    const items = await this.reservationRepo.find({
      skip: (page - 1) * limit,
      take: limit,
      order: {
        [order.field]: order.param,
      },
    });

    return new Ok({
      items: items,
      page,
      limit,
      total: items.length,
    });
  }
}
