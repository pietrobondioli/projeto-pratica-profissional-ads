import { ReqContextProvider } from '#/be/lib/application/request/req.context';
import { NotAuthorizedError } from '#/be/lib/exceptions/not-authorized.error';
import { CommandResult } from '@nestjs-architects/typed-cqrs';
import { Inject } from '@nestjs/common';
import { CommandHandler, IInferredCommandHandler } from '@nestjs/cqrs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Err, Ok } from 'neverthrow';
import { FeedbackRepo } from '../../db/feedback.model';
import { FeedbackNotFoundError } from '../../domain/errors/feedback-not-found.error';
import { FeedbackAggregate } from '../../domain/feedback.aggregate';
import { FEEDBACK_REPO } from '../../feedback.di-tokens';
import { DeleteFeedbackCommand } from './delete-feedback.command';

@CommandHandler(DeleteFeedbackCommand)
export class DeleteFeedbackCommandHandler
  implements IInferredCommandHandler<DeleteFeedbackCommand>
{
  constructor(
    @Inject(FEEDBACK_REPO)
    protected readonly feedbackRepo: FeedbackRepo,
    protected readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(
    command: DeleteFeedbackCommand,
  ): Promise<CommandResult<DeleteFeedbackCommand>> {
    try {
      const { feedbackId } = command.payload;

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

      await this.feedbackRepo.delete(feedback.id);

      FeedbackAggregate.entityID(feedback.id).deleted();

      FeedbackAggregate.publishEvents(this.eventEmitter);

      return new Ok(true);
    } finally {
      FeedbackAggregate.clearEvents();
    }
  }
}
