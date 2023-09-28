import { CommandResult } from '@nestjs-architects/typed-cqrs';
import { Inject } from '@nestjs/common';
import { CommandHandler, IInferredCommandHandler } from '@nestjs/cqrs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Err, Ok } from 'neverthrow';

import { EquipmentRepo } from '#/be/modules/equipment/db/equipment.model';
import { EquipmentNotFoundError } from '#/be/modules/equipment/domain/errors/equipment-not-found.error';
import { EQUIPMENT_REPO } from '#/be/modules/equipment/equipment.di-tokens';
import { UserRepo } from '#/be/modules/user/db/user.model';
import { UserNotFoundError } from '#/be/modules/user/domain/errors/user-not-found.error';
import { USER_REPO } from '#/be/modules/user/user.di-tokens';

import { ReservationRepo } from '../../db/reservation.model';
import { InvalidReservePeriodError } from '../../domain/errors/invalid-reserve-period.error';
import { ReservationAggregate } from '../../domain/reservation.aggregate';
import { Reservation } from '../../domain/reservation.entity';
import { RESERVATION_REPO } from '../../reservation.di-tokens';

import { isFuture, isWithinInterval } from 'date-fns';
import { CreateReservationCommand } from './create-reservation.command';

@CommandHandler(CreateReservationCommand)
export class CreateReservationCommandHandler
  implements IInferredCommandHandler<CreateReservationCommand>
{
  constructor(
    @Inject(RESERVATION_REPO)
    private readonly reservationRepo: ReservationRepo,
    @Inject(EQUIPMENT_REPO)
    private readonly equipmentRepo: EquipmentRepo,
    @Inject(USER_REPO)
    private readonly userRepo: UserRepo,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(
    command: CreateReservationCommand,
  ): Promise<CommandResult<CreateReservationCommand>> {
    try {
      const { loggedUser, equipmentId, startDate, endDate } = command.payload;

      const user = await this.userRepo.findOneBy({
        id: loggedUser.id,
      });

      if (!user) {
        return new Err(new UserNotFoundError());
      }

      const equipment = await this.equipmentRepo.findOne({
        where: {
          id: equipmentId,
        },
        relations: {
          reservations: true,
        },
      });

      if (!equipment) {
        return new Err(new EquipmentNotFoundError());
      }

      const isReservationPeriodValid = this.checkReservationPeriodValidity(
        startDate,
        endDate,
      );

      if (!isReservationPeriodValid) {
        return new Err(new InvalidReservePeriodError());
      }

      const isAvailable = this.checkReservationAvailability(
        equipment.reservations,
        startDate,
        endDate,
      );

      if (!isAvailable) {
        return new Err(new InvalidReservePeriodError());
      }

      const reservation = new Reservation(loggedUser.id);
      reservation.equipment = equipment;
      reservation.renter = user;
      reservation.startDate = startDate;
      reservation.endDate = endDate;
      reservation.totalPrice = this.calculateTotalPrice(
        startDate,
        endDate,
        equipment.pricePerDay,
      );

      const createdReservation = await this.reservationRepo.save(reservation);

      ReservationAggregate.entityID(createdReservation.id).created();

      ReservationAggregate.publishEvents(this.eventEmitter);

      return new Ok(createdReservation.id);
    } finally {
      ReservationAggregate.clearEvents();
    }
  }

  private checkReservationPeriodValidity(startDate: Date, endDate: Date) {
    return (
      isFuture(startDate) &&
      isFuture(endDate) &&
      startDate.getTime() < endDate.getTime()
    );
  }

  private checkReservationAvailability(
    reservations: Reservation[],
    startDate: Date,
    endDate: Date,
  ) {
    const isAvailable = reservations.every((reservation) => {
      return (
        !isWithinInterval(startDate, {
          start: reservation.startDate,
          end: reservation.endDate,
        }) &&
        !isWithinInterval(endDate, {
          start: reservation.startDate,
          end: reservation.endDate,
        })
      );
    });

    return isAvailable;
  }

  private calculateTotalPrice(
    startDate: Date,
    endDate: Date,
    pricePerDay: number,
  ) {
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays * pricePerDay;
  }
}
