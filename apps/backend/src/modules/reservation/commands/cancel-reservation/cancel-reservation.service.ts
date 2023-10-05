import { CommandResult } from '@nestjs-architects/typed-cqrs';
import { Inject } from '@nestjs/common';
import { CommandHandler, IInferredCommandHandler } from '@nestjs/cqrs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Err, Ok } from 'neverthrow';

import { ReservationRepo } from '../../db/reservation.model';
import { ReservationNotFoundError } from '../../domain/errors/reservation-not-found.error';
import { ReservationAggregate } from '../../domain/reservation.aggregate';
import { RESERVATION_REPO } from '../../reservation.di-tokens';

import { CancelReservationCommand } from './cancel-reservation.command';

@CommandHandler(CancelReservationCommand)
export class CancelReservationCommandHandler
  implements IInferredCommandHandler<CancelReservationCommand>
{
  constructor(
    @Inject(RESERVATION_REPO)
    private readonly reservationRepo: ReservationRepo,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(
    command: CancelReservationCommand,
  ): Promise<CommandResult<CancelReservationCommand>> {
    try {
      const { loggedUser, reservationId } = command.payload;

      const reservation = await this.reservationRepo.findOne({
        where: [
          {
            id: reservationId,
            renter: { id: loggedUser.id },
          },
          {
            id: reservationId,
            equipment: { owner: { id: loggedUser.id } },
          },
        ],
      });

      if (!reservation) {
        return new Err(new ReservationNotFoundError());
      }

      await this.reservationRepo.delete({
        id: reservationId,
      });

      ReservationAggregate.entityID(reservation.id).canceled(loggedUser.id);

      ReservationAggregate.publishEvents(this.eventEmitter);

      return new Ok(true);
    } finally {
      ReservationAggregate.clearEvents();
    }
  }
}
