import { QueryResult } from '@nestjs-architects/typed-cqrs';
import { Inject } from '@nestjs/common';
import { IInferredQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Ok } from 'neverthrow';

import { NotificationRepo } from '../../db/notification.model';
import { NOTIFICATION_REPO } from '../../notification.di-tokens';

import { ListUserNotificationsQuery } from './list-user-notifications.query';

@QueryHandler(ListUserNotificationsQuery)
export class ListUserNotificationsQueryHandler
  implements IInferredQueryHandler<ListUserNotificationsQuery>
{
  constructor(
    @Inject(NOTIFICATION_REPO)
    private readonly notificationRepo: NotificationRepo,
  ) {}

  async execute(
    query: ListUserNotificationsQuery,
  ): Promise<QueryResult<ListUserNotificationsQuery>> {
    const { loggedUser, page, limit, order } = query.payload;

    const [notifications, total] = await this.notificationRepo.findAndCount({
      where: {
        user: {
          id: loggedUser.id,
        },
      },
      skip: Math.max(0, (page - 1) * limit),
      take: limit,
      order: {
        [order.field]: order.param,
      },
    });

    return new Ok({
      items: notifications,
      page,
      limit,
      total: notifications.length,
      hasMore: page * limit < total,
    });
  }
}
