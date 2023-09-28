import { CommandResult } from '@nestjs-architects/typed-cqrs';
import { Inject } from '@nestjs/common';
import { CommandHandler, IInferredCommandHandler } from '@nestjs/cqrs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Err, Ok } from 'neverthrow';

import { ReservationRepo } from '#/be/modules/reservation/db/reservation.model';
import { ReservationNotFoundError } from '#/be/modules/reservation/domain/errors/reservation-not-found.error';
import { RESERVATION_REPO } from '#/be/modules/reservation/reservation.di-tokens';
import { UserRepo } from '#/be/modules/user/db/user.model';
import { UserNotFoundError } from '#/be/modules/user/domain/errors/user-not-found.error';
import { USER_REPO } from '#/be/modules/user/user.di-tokens';

import { FeedbackRepo } from '../../db/feedback.model';
import { FeedbackAggregate } from '../../domain/feedback.aggregate';
import { Feedback } from '../../domain/feedback.entity';
import { FEEDBACK_REPO } from '../../feedback.di-tokens';

import { NotAuthorizedError } from '#/be/lib/exceptions/not-authorized.error';
import { Reservation } from '#/be/modules/reservation/domain/reservation.entity';
import { isPast } from 'date-fns';
import { FeedbackAlreadyExistsError } from '../../domain/errors/feedback-already-exists';
import { ReservationNotFinalizedYetError } from '../../domain/errors/reservation-not-finalized-yet.error';
import { CreateFeedbackCommand } from './create-feedback.command';

@CommandHandler(CreateFeedbackCommand)
export class CreateFeedbackCommandHandler
  implements IInferredCommandHandler<CreateFeedbackCommand>
{
  constructor(
    @Inject(FEEDBACK_REPO)
    private readonly feedbackRepo: FeedbackRepo,
    @Inject(RESERVATION_REPO)
    private readonly reservationRepo: ReservationRepo,
    @Inject(USER_REPO)
    private readonly userRepo: UserRepo,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(
    command: CreateFeedbackCommand,
  ): Promise<CommandResult<CreateFeedbackCommand>> {
    try {
      const { loggedUser, reservationId, rating, comment } = command.payload;

      const user = await this.userRepo.findOneBy({
        id: loggedUser.id,
      });

      if (!user) {
        return new Err(new UserNotFoundError());
      }

      const existentFeedback = await this.feedbackRepo.findOneBy({
        fromUser: {
          id: loggedUser.id,
        },
        reservation: {
          id: reservationId,
        },
      });

      if (existentFeedback) {
        return new Err(new FeedbackAlreadyExistsError());
      }

      const reservation = await this.reservationRepo.findOne({
        where: {
          id: reservationId,
        },
        relations: ['renter'],
      });

      if (!reservation) {
        return new Err(new ReservationNotFoundError());
      }

      if (reservation.renter.id !== loggedUser.id) {
        return new Err(new NotAuthorizedError());
      }

      if (!this.checkIsReservationFinished(reservation)) {
        return new Err(new ReservationNotFinalizedYetError());
      }

      const feedback = new Feedback(loggedUser.id);
      feedback.reservation = reservation;
      feedback.rating = rating;
      feedback.comment = comment;
      feedback.fromUser = user;

      const createdFeedback = await this.feedbackRepo.save(feedback);

      FeedbackAggregate.entityID(createdFeedback.id).created();

      return new Ok(createdFeedback.id);
    } finally {
      FeedbackAggregate.clearEvents();
    }
  }

  private checkIsReservationFinished(reservation: Reservation) {
    return isPast(reservation.endDate);
  }
}
