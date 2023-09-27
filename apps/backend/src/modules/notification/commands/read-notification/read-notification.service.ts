import { ReqContextProvider } from '#/be/lib/application/request/req.context';
import { NotAuthorizedError } from '#/be/lib/exceptions/not-authorized.error';
import { USER_REPO } from '#/be/modules/user/user.di-tokens';
import { CommandResult } from '@nestjs-architects/typed-cqrs';
import { Inject } from '@nestjs/common';
import { CommandHandler, IInferredCommandHandler } from '@nestjs/cqrs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Err, Ok } from 'neverthrow';
import { Repository } from 'typeorm';
import { NotificationRepo } from '../../db/notification.model';
import { NotificationNotFoundError } from '../../domain/errors/notification-not-found.error';
import { NotificationAggregate } from '../../domain/notification.aggregate';
import { NotificationStatus } from '../../domain/notification.entity';
import { NOTIFICATION_REPO } from '../../notification.di-tokens';
import { ReadNotificationCommand } from './read-notification.command';

@CommandHandler(ReadNotificationCommand)
export class ReadNotificationCommandHandler
  implements IInferredCommandHandler<ReadNotificationCommand>
{
  constructor(
    @Inject(NOTIFICATION_REPO)
    protected readonly notificationRepo: NotificationRepo,
    @Inject(USER_REPO)
    protected readonly userRepo: Repository<any>,
    protected readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(
    command: ReadNotificationCommand,
  ): Promise<CommandResult<ReadNotificationCommand>> {
    try {
      const { notificationId } = command.payload;

      const authUser = ReqContextProvider.getAuthUser();

      const notification = await this.notificationRepo.findOne({
        where: {
          id: notificationId,
        },
        relations: {
          user: true,
        },
      });

      if (!notification) {
        return new Err(new NotificationNotFoundError());
      }

      if (notification.user.id !== authUser.id) {
        return new Err(new NotAuthorizedError());
      }

      await this.notificationRepo.update(
        {
          id: notificationId,
        },
        {
          status: NotificationStatus.READ,
        },
      );

      NotificationAggregate.publishEvents(this.eventEmitter);

      return new Ok(true);
    } finally {
      NotificationAggregate.clearEvents();
    }
  }
}
