import { Column, Entity, ManyToOne, Repository } from 'typeorm';

import { BaseModel } from '#/be/lib/db/base.model';
import { UserModel } from '#/be/modules/user/db/user.model';

import {
  Notification,
  NotificationStatus,
} from '../domain/notification.entity';

@Entity({
  name: 'notification',
})
export class NotificationModel extends BaseModel implements Notification {
  @ManyToOne(() => UserModel, (user) => user.notifications)
  user: UserModel;

  @Column()
  message: string;

  @Column({ type: 'enum', enum: NotificationStatus })
  status: NotificationStatus;
}

export type NotificationRepo = Repository<NotificationModel>;
