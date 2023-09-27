import { ReqContextProvider } from '#/be/lib/application/request/req.context';
import { ReservationRepo } from '#/be/modules/reservation/db/reservation.model';
import { ReservationNotFoundError } from '#/be/modules/reservation/domain/errors/reservation-not-found.error';
import { RESERVATION_REPO } from '#/be/modules/reservation/reservation.di-tokens';
import { UserRepo } from '#/be/modules/user/db/user.model';
import { UserNotFoundError } from '#/be/modules/user/domain/errors/user-not-found.error';
import { USER_REPO } from '#/be/modules/user/user.di-tokens';
import { CommandResult } from '@nestjs-architects/typed-cqrs';
import { Inject } from '@nestjs/common';
import { CommandHandler, IInferredCommandHandler } from '@nestjs/cqrs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Err, Ok } from 'neverthrow';
import { FeedbackRepo } from '../../db/feedback.model';
import { FeedbackAggregate } from '../../domain/feedback.aggregate';
import { Feedback } from '../../domain/feedback.entity';
import { FEEDBACK_REPO } from '../../feedback.di-tokens';
import { CreateFeedbackCommand } from './create-feedback.command';

@CommandHandler(CreateFeedbackCommand)
export class CreateFeedbackCommandHandler
  implements IInferredCommandHandler<CreateFeedbackCommand>
{
  constructor(
    @Inject(FEEDBACK_REPO)
    protected readonly feedbackRepo: FeedbackRepo,
    @Inject(RESERVATION_REPO)
    protected readonly reservationRepo: ReservationRepo,
    @Inject(USER_REPO)
    protected readonly userRepo: UserRepo,
    protected readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(
    command: CreateFeedbackCommand,
  ): Promise<CommandResult<CreateFeedbackCommand>> {
    try {
      const { reservationId, rating, comment } = command.payload;

      const authUser = ReqContextProvider.getAuthUser();

      const user = await this.userRepo.findOneBy({
        id: authUser.id,
      });

      if (!user) {
        return new Err(new UserNotFoundError());
      }

      const reservation = await this.reservationRepo.findOneBy({
        id: reservationId,
      });

      if (!reservation) {
        return new Err(new ReservationNotFoundError());
      }

      const feedback = new Feedback(authUser.id);
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
}
