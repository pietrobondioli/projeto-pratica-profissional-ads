import { UserRepo } from '#/be/modules/user/db/user.model';
import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EquipmentDeletedEvent } from '../../equipment/domain/events/equipment-deleted.event';
import { USER_REPO } from '../../user/user.di-tokens';
import { NotificationRepo } from '../db/notification.model';
import { Notification } from '../domain/notification.entity';
import { NOTIFICATION_REPO } from '../notification.di-tokens';

@Injectable()
export class OnEquipmentDeletedNotifyUserEventHandler {
  constructor(
    @Inject(USER_REPO)
    private readonly userRepo: UserRepo,
    @Inject(NOTIFICATION_REPO)
    private readonly notificationRepo: NotificationRepo,
  ) {}

  @OnEvent(EquipmentDeletedEvent.name, { async: true, promisify: true })
  async handle(event: EquipmentDeletedEvent): Promise<any> {
    try {
      const { equipmentName, userId } = event.payload;

      const user = await this.userRepo.findOneBy({ id: userId });

      if (!user) {
        return;
      }

      const notification = new Notification();
      notification.message = `Your equipment ${equipmentName} has been deleted`;
      notification.user = user;
    } catch {}
  }
}
