import { Logger, Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { DataSource } from 'typeorm';

import { TYPEORM_DATA_SOURCE } from '#/be/config/database/database.providers';

import { UserModule } from '../user/user.module';

import { ReadNotificationHttpController } from './commands/read-notification/read-notification.http.controller';
import { ReadNotificationCommandHandler } from './commands/read-notification/read-notification.service';
import { NotificationModel } from './db/notification.model';
import { NOTIFICATION_REPO } from './notification.di-tokens';
import { ListUserNotificationsHttpController } from './queries/list-user-notifications/list-user-notifications.http.controller';
import { ListUserNotificationsQueryHandler } from './queries/list-user-notifications/list-user-notifications.service';

const commandHandlers: Provider[] = [ReadNotificationCommandHandler];

const queryHandlers: Provider[] = [ListUserNotificationsQueryHandler];

const mappers: Provider[] = [];

const repositories: Provider[] = [
  {
    provide: NOTIFICATION_REPO,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(NotificationModel),
    inject: [TYPEORM_DATA_SOURCE],
  },
];

@Module({
  imports: [CqrsModule, UserModule],
  controllers: [
    ReadNotificationHttpController,
    ListUserNotificationsHttpController,
  ],
  providers: [
    Logger,
    ...repositories,
    ...commandHandlers,
    ...queryHandlers,
    ...mappers,
  ],
  exports: [...repositories],
})
export class NotificationModule {}
