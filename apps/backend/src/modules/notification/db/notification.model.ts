import { Column, Entity, ManyToOne } from 'typeorm';

import {
  Notification,
  NotificationStatus,
} from '../domain/notification.entity';

import { BaseModel } from '#/be/lib/db/base.model';
import { UserModel } from '#/be/modules/user/db/user.model';

@Entity()
export class NotificationModel extends BaseModel implements Notification {
  @ManyToOne(() => UserModel, (user) => user.notifications)
  user: UserModel;

  @Column()
  message: string;

  @Column({ type: 'enum', enum: NotificationStatus })
  status: NotificationStatus;
}
