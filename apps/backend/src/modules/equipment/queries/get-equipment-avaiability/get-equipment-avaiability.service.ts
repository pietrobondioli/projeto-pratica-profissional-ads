import { QueryResult } from '@nestjs-architects/typed-cqrs';
import { Inject } from '@nestjs/common';
import { IInferredQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Err, Ok } from 'neverthrow';

import { EquipmentRepo } from '../../db/equipment.model';
import { EquipmentNotFoundError } from '../../domain/errors/equipment-not-found.error';
import { EQUIPMENT_REPO } from '../../equipment.di-tokens';

import { Reservation } from '#/be/modules/reservation/domain/reservation.entity';
import { eachDayOfInterval } from 'date-fns';
import { LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { GetEquipmentAvailabilityQuery } from './get-equipment-avaiability.query';

@QueryHandler(GetEquipmentAvailabilityQuery)
export class GetEquipmentAvailabilityAvailabilityQueryHandler
  implements IInferredQueryHandler<GetEquipmentAvailabilityQuery>
{
  constructor(
    @Inject(EQUIPMENT_REPO)
    private readonly equipmentRepo: EquipmentRepo,
  ) {}

  async execute(
    query: GetEquipmentAvailabilityQuery,
  ): Promise<QueryResult<GetEquipmentAvailabilityQuery>> {
    const { equipmentId, startDate, endDate } = query.payload;

    const equipment = await this.equipmentRepo.findOne({
      where: [
        {
          id: equipmentId,
        },
        {
          id: equipmentId,
          reservations: {
            startDate: MoreThanOrEqual(startDate),
            endDate: LessThanOrEqual(endDate),
          },
        },
      ],
      relations: ['reservations'],
    });

    if (!equipment) {
      return new Err(new EquipmentNotFoundError());
    }

    return new Ok({
      notAvailableDates: this.getNotAvailableDatesFromReservations(
        equipment.reservations,
      ),
    });
  }

  private getNotAvailableDatesFromReservations(reservations: Reservation[]) {
    return reservations
      .map((reservation) => {
        const { startDate, endDate } = reservation;

        const dates = eachDayOfInterval({
          start: startDate,
          end: endDate,
        });

        return dates;
      })
      .flat();
  }
}
