import { QueryResult } from '@nestjs-architects/typed-cqrs';
import { Inject } from '@nestjs/common';
import { IInferredQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Ok } from 'neverthrow';
import { FeedbackRepo } from '../../db/feedback.model';
import { FEEDBACK_REPO } from '../../feedback.di-tokens';
import { ListUserFeedbacksQuery } from './list-user-feedbacks.query';

@QueryHandler(ListUserFeedbacksQuery)
export class ListUserFeedbacksQueryHandler
  implements IInferredQueryHandler<ListUserFeedbacksQuery>
{
  constructor(
    @Inject(FEEDBACK_REPO)
    private readonly feedbackRepo: FeedbackRepo,
  ) {}

  async execute(
    query: ListUserFeedbacksQuery,
  ): Promise<QueryResult<ListUserFeedbacksQuery>> {
    const { userId, page, limit, order } = query.payload;

    const [feedbacks, total] = await this.feedbackRepo.findAndCount({
      where: {
        fromUser: { id: userId },
      },
      skip: Math.max(0, (page - 1) * limit),
      take: limit,
      order: {
        [order.field]: order.param,
      },
      relations: ['fromUser', 'reservation'],
    });

    return new Ok({
      items: feedbacks,
      page,
      limit,
      total: feedbacks.length,
      hasMore: page * limit < total,
    });
  }
}
