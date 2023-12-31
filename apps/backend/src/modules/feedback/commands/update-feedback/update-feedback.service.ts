import { CommandResult } from '@nestjs-architects/typed-cqrs';
import { Inject } from '@nestjs/common';
import { CommandHandler, IInferredCommandHandler } from '@nestjs/cqrs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Err, Ok } from 'neverthrow';

import { FeedbackRepo } from '../../db/feedback.model';
import { FeedbackNotFoundError } from '../../domain/errors/feedback-not-found.error';
import { FeedbackAggregate } from '../../domain/feedback.aggregate';
import { FEEDBACK_REPO } from '../../feedback.di-tokens';

import { UpdateFeedbackCommand } from './update-feedback.command';

@CommandHandler(UpdateFeedbackCommand)
export class UpdateFeedbackCommandHandler
  implements IInferredCommandHandler<UpdateFeedbackCommand>
{
  constructor(
    @Inject(FEEDBACK_REPO)
    private readonly feedbackRepo: FeedbackRepo,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(
    command: UpdateFeedbackCommand,
  ): Promise<CommandResult<UpdateFeedbackCommand>> {
    try {
      const { loggedUser, feedbackId, rating, comment } = command.payload;

      const feedback = await this.feedbackRepo.findOneBy({
        id: feedbackId,
        fromUser: {
          id: loggedUser.id,
        },
      });

      if (!feedback) {
        return new Err(new FeedbackNotFoundError());
      }

      if (rating) feedback.rating = rating;
      if (comment) feedback.comment = comment;

      await this.feedbackRepo.save(feedback);

      FeedbackAggregate.entityID(feedback.id).updated();

      FeedbackAggregate.publishEvents(this.eventEmitter);

      return new Ok(feedback.id);
    } finally {
      FeedbackAggregate.clearEvents();
    }
  }
}
