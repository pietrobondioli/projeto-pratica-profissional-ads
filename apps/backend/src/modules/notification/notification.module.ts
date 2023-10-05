import { Logger, Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { DataSource } from 'typeorm';

import { TYPEORM_DATA_SOURCE } from '#/be/config/database/database.providers';

import { UserModule } from '../user/user.module';

import { EquipmentModule } from '../equipment/equipment.module';
import { ReservationModule } from '../reservation/reservation.module';
import { ReadNotificationHttpController } from './commands/read-notification/read-notification.http.controller';
import { ReadNotificationCommandHandler } from './commands/read-notification/read-notification.service';
import { NotificationModel } from './db/notification.model';
import { OnEquipmentCreatedNotifyUserEventHandler } from './event-handlers/on-equipment-created.notify-user.event-handler';
import { OnEquipmentDeletedNotifyUserEventHandler } from './event-handlers/on-equipment-deleted.notify-user.event-handler';
import { OnEquipmentUpdatedNotifyUserEventHandler } from './event-handlers/on-equipment-updated.notify-user.event-handler';
import { OnReservationCanceledNotifyUsersEventHandler } from './event-handlers/on-reservation-canceled.notify-users.event-handler';
import { OnReservationCreatedNotifyUsersEventHandler } from './event-handlers/on-reservation-created.notify-users.event-handler';
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
  OnEquipmentCreatedNotifyUserEventHandler,
  OnEquipmentUpdatedNotifyUserEventHandler,
  OnEquipmentDeletedNotifyUserEventHandler,
  OnReservationCreatedNotifyUsersEventHandler,
  OnReservationCanceledNotifyUsersEventHandler,
];

@Module({
  imports: [CqrsModule, UserModule, EquipmentModule, ReservationModule],
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
