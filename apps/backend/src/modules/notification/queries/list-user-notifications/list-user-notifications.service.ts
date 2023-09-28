import { Inject } from '@nestjs/common';
import { IInferredQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { QueryResult } from '@nestjs-architects/typed-cqrs';
import { Ok } from 'neverthrow';

import { ReqContextProvider } from '#/be/lib/application/request/req.context';

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
    const { page, limit, order } = query.payload;

    const authUser = ReqContextProvider.getAuthUser();

    const items = await this.notificationRepo.find({
      where: {
        user: {
          id: authUser.id,
        },
      },
      skip: (page - 1) * limit,
      take: limit,
      order: {
        [order.field]: order.param,
      },
    });

    return new Ok({
      items: items,
      page,
      limit,
      total: items.length,
    });
  }
}
