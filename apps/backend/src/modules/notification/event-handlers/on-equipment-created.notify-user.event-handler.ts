import { UserRepo } from '#/be/modules/user/db/user.model';
import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EquipmentRepo } from '../../equipment/db/equipment.model';
import { EquipmentCreatedEvent } from '../../equipment/domain/events/equipment-created.event';
import { EQUIPMENT_REPO } from '../../equipment/equipment.di-tokens';
import { USER_REPO } from '../../user/user.di-tokens';
import { NotificationRepo } from '../db/notification.model';
import { Notification } from '../domain/notification.entity';
import { NOTIFICATION_REPO } from '../notification.di-tokens';

@Injectable()
export class OnEquipmentCreatedNotifyUserEventHandler {
  constructor(
    @Inject(USER_REPO)
    private readonly userRepo: UserRepo,
    @Inject(EQUIPMENT_REPO)
    private readonly equipmentRepo: EquipmentRepo,
    @Inject(NOTIFICATION_REPO)
    private readonly notificationRepo: NotificationRepo,
  ) {}

  @OnEvent(EquipmentCreatedEvent.name, { async: true, promisify: true })
  async handle(event: EquipmentCreatedEvent): Promise<any> {
    try {
      const { equipmentId, userId } = event.payload;

      const user = await this.userRepo.findOneBy({ id: userId });

      if (!user) {
        return;
      }

      const equipment = await this.equipmentRepo.findOneBy({ id: equipmentId });

      if (!equipment) {
        return;
      }

      const notification = new Notification();
      notification.message = `Your equipment ${equipment.title} has been created`;
      notification.user = user;
    } catch {}
  }
}
