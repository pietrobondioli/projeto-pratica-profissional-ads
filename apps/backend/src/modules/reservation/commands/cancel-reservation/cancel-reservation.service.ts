import { ReqContextProvider } from '#/be/lib/application/request/req.context';
import { NotAuthorizedError } from '#/be/lib/exceptions/not-authorized.error';
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
    protected readonly reservationRepo: ReservationRepo,
    protected readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(
    command: CancelReservationCommand,
  ): Promise<CommandResult<CancelReservationCommand>> {
    try {
      const { reservationId } = command.payload;

      const authUser = ReqContextProvider.getAuthUser();

      const reservation = await this.reservationRepo.findOne({
        where: {
          id: reservationId,
        },
        relations: {
          renter: true,
        },
      });

      if (!reservation) {
        return new Err(new ReservationNotFoundError());
      }

      if (reservation.renter.id !== authUser.id) {
        return new Err(new NotAuthorizedError());
      }

      await this.reservationRepo.delete({
        id: reservationId,
      });

      ReservationAggregate.publishEvents(this.eventEmitter);

      return new Ok(true);
    } finally {
      ReservationAggregate.clearEvents();
    }
  }
}
