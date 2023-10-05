import { Logger, Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { DataSource } from 'typeorm';

import { TYPEORM_DATA_SOURCE } from '#/be/config/database/database.providers';

import { UserModule } from '../user/user.module';

import { OnEmailChangeSendEmailEventHandler } from '../user/event-handlers/on-email-change.send-email.event-handler';
import { OnPasswordChangeSendEmailEventHandler } from '../user/event-handlers/on-password-change.send-email.event-handler';
import { OnUserConfirmEmailSendEmailEventHandler } from '../user/event-handlers/on-user-confirm-email.send-email.event-handler';
import { OnUserCreatedCreateProfileEventHandler } from '../user/event-handlers/on-user-created.create-profile.event-handler';
import { OnUserCreatedSendEmailEventHandler } from '../user/event-handlers/on-user-created.send-email.event-handler';
import { OnUserReqEmailChangeSendEmailEventHandler } from '../user/event-handlers/on-user-req-email-change.send-email.event-handler';
import { OnUserReqNewVerificationTokenSendEmailEventHandler } from '../user/event-handlers/on-user-req-new-verification-token.send-email.event-handler';
import { OnUserReqPasswordChangeSendEmailEventHandler } from '../user/event-handlers/on-user-req-password-change.send-email.event-handler';
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

const eventHandlers: Provider[] = [
  OnEmailChangeSendEmailEventHandler,
  OnPasswordChangeSendEmailEventHandler,
  OnUserConfirmEmailSendEmailEventHandler,
  OnUserCreatedCreateProfileEventHandler,
  OnUserCreatedSendEmailEventHandler,
  OnUserReqEmailChangeSendEmailEventHandler,
  OnUserReqNewVerificationTokenSendEmailEventHandler,
  OnUserReqPasswordChangeSendEmailEventHandler,
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
    ...eventHandlers,
  ],
  exports: [...repositories],
})
export class NotificationModule {}
