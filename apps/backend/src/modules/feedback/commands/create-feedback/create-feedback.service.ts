import { ReservationRepo } from '#/be/modules/reservation/db/reservation.model';
import { ReservationNotFoundError } from '#/be/modules/reservation/domain/errors/reservation-not-found.error';
import { RESERVATION_REPO } from '#/be/modules/reservation/reservation.di-tokens';
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
    protected readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(
    command: CreateFeedbackCommand,
  ): Promise<CommandResult<CreateFeedbackCommand>> {
    try {
      const { reservationId, rating, comment } = command.payload;

      const reservation = await this.reservationRepo.findOneBy({
        id: reservationId,
      });

      if (!reservation) {
        return new Err(new ReservationNotFoundError());
      }

      const feedback = new Feedback();
      feedback.reservation = reservation;
      feedback.rating = rating;
      feedback.comment = comment;

      const createdFeedback = await this.feedbackRepo.save(feedback);

      FeedbackAggregate.entity(createdFeedback).created();

      return new Ok(createdFeedback.id);
    } finally {
      FeedbackAggregate.clearEvents();
    }
  }
}
