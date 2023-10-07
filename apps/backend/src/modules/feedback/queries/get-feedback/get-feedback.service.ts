import { QueryResult } from '@nestjs-architects/typed-cqrs';
import { Inject } from '@nestjs/common';
import { IInferredQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Err, Ok } from 'neverthrow';
import { FeedbackRepo } from '../../db/feedback.model';
import { FeedbackNotFoundError } from '../../domain/errors/feedback-not-found.error';
import { FEEDBACK_REPO } from '../../feedback.di-tokens';
import { GetFeedbackQuery } from './get-feedback.query';

@QueryHandler(GetFeedbackQuery)
export class GetFeedbackQueryHandler
  implements IInferredQueryHandler<GetFeedbackQuery>
{
  constructor(
    @Inject(FEEDBACK_REPO)
    private readonly feedbackRepo: FeedbackRepo,
  ) {}

  async execute(
    query: GetFeedbackQuery,
  ): Promise<QueryResult<GetFeedbackQuery>> {
    const { feedbackId } = query.payload;

    const feedback = await this.feedbackRepo.findOne({
      where: {
        id: feedbackId,
      },
      relations: ['fromUser', 'reservation'],
    });

    if (!feedback) {
      return new Err(new FeedbackNotFoundError());
    }

    return new Ok(feedback);
  }
}
