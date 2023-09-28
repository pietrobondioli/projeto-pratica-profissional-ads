import { Inject } from '@nestjs/common';
import { CommandHandler, IInferredCommandHandler } from '@nestjs/cqrs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CommandResult } from '@nestjs-architects/typed-cqrs';
import { Err, Ok } from 'neverthrow';

import { ReqContextProvider } from '#/be/lib/application/request/req.context';
import { NotAuthorizedError } from '#/be/lib/exceptions/not-authorized.error';

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
      const { feedbackId, rating, comment } = command.payload;

      const authUser = ReqContextProvider.getAuthUser();

      const feedback = await this.feedbackRepo.findOneBy({
        id: feedbackId,
      });

      if (!feedback) {
        return new Err(new FeedbackNotFoundError());
      }

      if (feedback.fromUser.id !== authUser.id) {
        return new Err(new NotAuthorizedError());
      }

      await this.feedbackRepo.update(
        {
          id: feedbackId,
          fromUser: {
            id: authUser.id,
          },
        },
        {
          rating,
          comment,
        },
      );

      FeedbackAggregate.entityID(feedback.id).updated();

      FeedbackAggregate.publishEvents(this.eventEmitter);

      return new Ok(feedback.id);
    } finally {
      FeedbackAggregate.clearEvents();
    }
  }
}
